
## Next Tasks

Next Features to Implement:

- API should take care of transaction stats: Move receiptUtils logic over to its own controller for global and individual client stats calculations. Add designiated endpoint
- Update the *add receipt form*: Right now the add reciept form is a placeholder copy of add address form. Modify for reciept specific entries (price, qty, ingoing, outgoing, etc). 
- In *add receipt form* add a "connected to" dropdown that lists existing clients: Receipts must belong to a current client in some capacity.
- Provide "add transaction" feature in the tranaction modal: This should allow the addition of a receipt to a selected user. Should suppoort adding under the "outgoing" or "incoming" filters to directly create receipts of either type
- Implement **auth**: A user that is logged in should only have access to their information, not other users. They can add a transaction or delete a transaction. An authenticated manager has the ability to add clients (addresse), receipts, delete clients or their receipts, and add/delete new transactions.
- Account deletion handling...: If an authenticated manager deletes a client, they should lose access to their dashboard. 

## Bugs & Delays

Ideally the features above should be implemented and finished, but these general task often turn into smaller tasks. Below is a record of problems and bugs, as well as the subtasks that result from those bugs.
