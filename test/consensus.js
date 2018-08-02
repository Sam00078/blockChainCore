
module.exports = async app => {

    const consensus = app.core.bcc.consensus


    const current_block_slot = await consensus.getBlockSlot()
    // LOG(current_block_slot)
    EQUAL(current_block_slot.slot > 0, true)
    // LOG( current_block_slot.slot * 60 *3 )


    






}