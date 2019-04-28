import {Component, OnInit} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {Chat} from '../../models/chat';
import {userToKendoUser} from '../utils';
import {Message, SendMessageEvent} from '@progress/kendo-angular-conversational-ui';
import {User} from '../../models/user';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ChatMediatorService} from '../mediator/chat-mediator.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    messages$: Observable<Message[]>;
    chatRef$ = new BehaviorSubject<AngularFirestoreDocument>(null);

    constructor(private auth: AuthService,
                private db: AngularFirestore,
                private mediatorService: ChatMediatorService) {
    }

    ngOnInit() {
        this.messages$ = combineLatest(
            this.auth.user$.pipe(map(user => user.uid)),
            this.mediatorService.selectedUserId$
        ).pipe(
            map(([userId, selectedUserId]) => {
                console.log(`new id selected: ${selectedUserId}`);
                /*
                    Change the chat reference every time we switch to a new user
                 */
                const ref = this.db.doc<Chat>(`chats/${userId}_${selectedUserId}`);
                this.chatRef$.next(ref);
                return ref;
            }),
            switchMap(ref => ref.valueChanges()),
            map(chat => chat ? chat.messages : []),
            map((messages: any[]) =>
                messages.map(message => {
                    message.timestamp = message.timestamp.toDate();
                    return message;
                }))
        );
    }

    toKendo(user: User) {
        return userToKendoUser(user);
    }

    async sendMessage($event: SendMessageEvent) {
        const ref = this.chatRef$.value;
        console.log(`sending message: ${$event.message}`);
        await ref.set({
            messages: firebase.firestore.FieldValue.arrayUnion($event.message)
        }, {merge: true});
    }
}
