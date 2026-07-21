package tahrir.spring.controllers;

import com.google.common.base.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.testng.annotations.Test;
import tahrir.TrConstants;
import tahrir.TrNode;
import tahrir.io.net.broadcasts.IdentityStore;
import tahrir.io.net.broadcasts.IncomingBroadcastMessageHandler;
import tahrir.io.net.broadcasts.UserIdentity;
import tahrir.io.net.broadcasts.broadcastMessages.BroadcastMessage;
import tahrir.spring.controllers.pojo.RestBroadcastMessage;
import tahrir.spring.controllers.pojo.RestIdentity;
import tahrir.tools.TrUtils;

import java.util.ArrayList;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.testng.Assert.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
public class IdentityControllerTest extends AbstractTestNGSpringContextTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private TrNode node;

    @Test
    public void getIdentity() throws Exception {
        MvcResult requestResult = mvc.perform(MockMvcRequestBuilders.get("/api/identity")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String json = requestResult.getResponse().getContentAsString();
        RestIdentity identity = TrUtils.gson.fromJson(json, RestIdentity.class);
        assertEquals(identity.getNickname(), node.getConfig().currentUserIdentity.getNick());
    }

    @Test
    public void postValidIdentity() throws Exception {
        String nickname = "@nomel7";
        String json = TrUtils.gson.toJson(new RestIdentity(nickname));

        node.mbClasses.identityStore = mock(IdentityStore.class);
        UserIdentity expectedIdentity = new UserIdentity(nickname, node.getRemoteNodeAddress().publicKey, Optional.of(node.getPrivateNodeId().privateKey));

        mvc.perform(MockMvcRequestBuilders.post("/api/identity")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated());
        verify(node.mbClasses.identityStore).addIdentityWithLabel(TrConstants.OWN, expectedIdentity);
    }

}