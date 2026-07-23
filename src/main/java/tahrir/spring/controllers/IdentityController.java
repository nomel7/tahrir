package tahrir.spring.controllers;

import com.google.common.base.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import tahrir.TrConstants;
import tahrir.TrNode;
import tahrir.io.net.broadcasts.UserIdentity;
import tahrir.io.net.broadcasts.broadcastMessages.BroadcastMessage;
import tahrir.io.net.broadcasts.broadcastMessages.ParsedBroadcastMessage;
import tahrir.io.net.broadcasts.broadcastMessages.SignedBroadcastMessage;
import tahrir.spring.controllers.pojo.RestBroadcastMessage;
import tahrir.spring.controllers.pojo.RestIdentity;

import static org.springframework.http.HttpStatus.OK;

@RestController
public class IdentityController {

    private final TrNode node;

    @Autowired
    public IdentityController(TrNode node) {
        this.node = node;
    }

    @RequestMapping(value = "/api/identity", method = RequestMethod.GET)
    public ResponseEntity<RestIdentity> getIdentity() {
        UserIdentity currentUserIdentity = node.getConfig().currentUserIdentity;
        RestIdentity restIdentity = new RestIdentity(currentUserIdentity.getNick());
        return new ResponseEntity<RestIdentity>(restIdentity, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/identity", method = RequestMethod.POST)
    public ResponseEntity<?> postMessage(@RequestBody RestIdentity restIdentity) {
        UserIdentity identity = new UserIdentity(restIdentity.getNickname(), node.getRemoteNodeAddress().publicKey, Optional.of(node.getPrivateNodeId().privateKey));
        node.mbClasses.identityStore.addIdentityWithLabel(TrConstants.OWN, identity);
        node.setCurrentIdentity(restIdentity.getNickname());
        return new ResponseEntity<String>("Success", HttpStatus.CREATED);

    }
}