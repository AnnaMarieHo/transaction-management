
## Next Tasks

### Next Features to Implement:

- Implement **auth**: A user that is logged in should only have access to their information, not other users. They can add a transaction or delete a transaction. An authenticated manager has the ability to add/delete clients (addresses) and their receipts. They will also have the ability to add/delete new transactions.
- Account deletion handling...: If an authenticated manager deletes a client, they should lose access to their dashboard. 

**Current Front-End**
- Update the *add receipt form*: Right now the add reciept form is a placeholder copy of add address form. Modify for reciept specific entries (price, qty, ingoing, outgoing, etc). 
- In *add receipt form* add a "connected to" dropdown that lists existing clients: Receipts must belong to a current client in some capacity.

- Provide **selected** client "add receipt" button and form (this is just barely different from *add reciept form* task - it's on a selected client basis): When the transaction drawer is open with a selected user's receipts, they should be able to add a receipt under the "outgoing" or "incoming" categories. This will require an "add button" and a form. Should suppoort adding under the "outgoing" or "incoming" filters to directly create receipts of either type

**API**
- Create the *add receipt* logic in the receipt controller
- Create the *edit receipt* logic in the receipt conttroller
- Create the *delete receipt* logic in the receipt controller
- Begin on auth - should support email verification and session token 

## Bugs, Delays, Optimizations, & Unexpected Sub-tasks

Ideally the features above should be implemented and finished, but these general task often turn into smaller tasks. Below is a record of problems, bugs, and optimizations, as well as the subtasks that result from these isues.

- [ ] OPTIMIZE OPTIMIZE OPTIMIZE. I've now learned what and what not to use Redux for... Removed UI state handling from addressSlice to stop unecessary re-renderings. This reduced ~15% latency during performance evaluation when running the application with a 6x CPU slowdown. 
    - Before when you clicking a card, Redux activeId changed and notified ALL 20+ AddressCard subscribers. ALL cards re-ran hooks and re-rendered
    - THe current latency reduction came from re-introducing activeId state management in App.jsx component to track selected addresses. Now only an active card re-renders and the previouly active card re-renders. Other ccards are skipped by React.memo
      
- [x] (Pretty much done) - API should take care of transaction stats:
    - [x]  Moved receiptUtils logic over to a designated service
    - [x]  Added eloquent relationships on the transaction & address models
    - [x]  Built out stats fetching endpoints for user specific stats and global stats
    - [x]  Removed the receipt hook and placed receipt fetching/logic in its own slice
    - [x]  Built out a statsSlice for stat's related fetching and state handling      

