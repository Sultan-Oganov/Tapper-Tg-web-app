export default function HistoryBitcoin() {
    return(
        <div className={"history_bitcoin"}>
            <div className={"history_amount"}>
                <img src={"/media/icons/cash.svg"}/>
                <div className={"history_amount_quantity"}>
                    5000
                </div>
            </div>
            <div className={"history_buttons"}>
                <button className={"taper_info_section_counting-quantity history__card-button"}>
                    Обмен
                </button>
                <button className={"taper_info_section_counting-quantity history__card-button"}>
                    История
                </button>
            </div>
            <div className={"history_bag"}>
                <img src={"/media/images/money-cash.png"}/>
            </div>
        </div>
    )
}