import accountsReducer, { addAccount } from "../../features/accounts/accountsSlice";

describe('accountSlice reducers', () => {
    it('should add accounts to state', () => {
        const initialState = {
            value: []
        }
        const newAccount = {
            id: 1,
            type: 'Spending',
            name: 'TD Test Spending',
            balance: 4355.72,
            user_id: 1,   
        }

        const nextState = accountsReducer(initialState, addAccount(newAccount));

        expect(nextState).toEqual({
            value: [newAccount]
        });
    });
});