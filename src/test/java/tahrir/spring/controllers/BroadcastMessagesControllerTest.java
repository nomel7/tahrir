package tahrir.spring.controllers;

import com.google.common.collect.Sets;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.testng.annotations.Test;
import tahrir.TrNode;
import tahrir.io.net.broadcasts.IncomingBroadcastMessageHandler;
import tahrir.io.net.broadcasts.broadcastMessages.BroadcastMessage;
import tahrir.io.net.broadcasts.broadcastMessages.ParsedBroadcastMessage;
import tahrir.io.net.broadcasts.broadcastMessages.SignedBroadcastMessage;
import tahrir.io.net.broadcasts.containers.BroadcastMessageInbox;
import tahrir.spring.controllers.pojo.RestBroadcastMessage;
import tahrir.tools.TrUtils;

import java.lang.reflect.Type;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
public class BroadcastMessagesControllerTest extends AbstractTestNGSpringContextTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private TrNode node;

    @Test
    public void postValidBroadcastMessage() throws Exception {
        String message = "This is a valid message.";
        String json = TrUtils.gson.toJson(new RestBroadcastMessage(message, 1));

        node.mbClasses.incomingMbHandler = mock(IncomingBroadcastMessageHandler.class);

        mvc.perform(MockMvcRequestBuilders.post("/api/broadcastMessages")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated());
        verify(node.mbClasses.incomingMbHandler).handleInsertion(any(BroadcastMessage.class));
    }

    @Test
    public void listBroadcastMessages() throws Exception {
        SortedSet<BroadcastMessage> microblogs = Sets.newTreeSet(new BroadcastMessageInbox.BroadcastMessageTimeComparator());
        microblogs.add(createBroadcastMessage("This is the first message"));
        microblogs.add(createBroadcastMessage("This is the second message"));
        microblogs.add(createBroadcastMessage("This is the third message"));
        node.mbClasses.mbsForViewing = mock(BroadcastMessageInbox.class);
        when(node.mbClasses.mbsForViewing.getMicroblogSet()).thenReturn(microblogs);

        MvcResult requestResult = mvc.perform(MockMvcRequestBuilders.get("/api/broadcastMessages"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        String json = requestResult.getResponse().getContentAsString();
        Type listType = new TypeToken<ArrayList<RestBroadcastMessage>>(){}.getType();
        ArrayList<RestBroadcastMessage> restBroadcastMessages = TrUtils.gson.fromJson(json, listType);
        assertEquals(restBroadcastMessages.size(), 3);

        assertEquals(restBroadcastMessages.get(0).getMessage(), "This is the third message");
        assertEquals(restBroadcastMessages.get(1).getMessage(), "This is the second message");
        assertEquals(restBroadcastMessages.get(2).getMessage(), "This is the first message");

        assertEquals(restBroadcastMessages.get(0).getNickname(), "Default");
        assertEquals(restBroadcastMessages.get(1).getNickname(), "Default");
        assertEquals(restBroadcastMessages.get(2).getNickname(), "Default");

        assertTrue(restBroadcastMessages.get(0).getTimeCreated() != 0);
        assertTrue(restBroadcastMessages.get(1).getTimeCreated() != 0);
        assertTrue(restBroadcastMessages.get(2).getTimeCreated() != 0);
    }

    private BroadcastMessage createBroadcastMessage(String message) {
        ParsedBroadcastMessage parsedBroadcastMessage = ParsedBroadcastMessage.createFromPlaintext(message, "en", node.mbClasses.identityStore, System.currentTimeMillis());
        SignedBroadcastMessage signedBroadcastMessage = new SignedBroadcastMessage(parsedBroadcastMessage, node.getConfig().currentUserIdentity);
        return new BroadcastMessage(signedBroadcastMessage);
    }
}