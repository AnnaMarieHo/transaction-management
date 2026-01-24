
## Next Tasks

# Next Features to Implement:

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

- API should take care of transaction stats: Move receiptUtils logic over to its own controller for global and individual client stats calculations. Add designiated endpoint
