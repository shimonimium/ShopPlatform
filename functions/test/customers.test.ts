import * as admin from 'firebase-admin';

import {fun} from './test-config';
import {getOrCreateCustomer, getUser, updateUser} from '../src/customers';

fun.cleanup;

admin.initializeApp();


let user: any;

beforeAll(async () => {
    user = {uid: Date.now().toString(), email: 'stripetest@example.com'};
    await updateUser(user.uid, user);
});

test('getOrCreateCustomer creates/retrieves a Stripe Customer', async () => {
    const cust = await getOrCreateCustomer(user.uid);

    expect(cust.id).toContain('cus_');
    expect(cust.metadata.firebaseUID).toEqual(user.uid);

    const userDoc = await getUser(user.uid);

    expect(userDoc.stripeCustomerId).toContain('cus_');
});
