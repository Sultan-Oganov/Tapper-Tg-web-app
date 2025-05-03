export default function CrashStepConstruct() {
    return(
        <div className={"info_card blue-background"}>
            <div className={"join_card_top w-3/5"}>
                <h3>
                    Step 1
                </h3>
                <p>
                    Enter the required amount and click the BET button!
                </p>
            </div>
            <div className={"info_card_image"}>
                <img className={'h-[55px]'} src={"/media/images/info_step1.png"}/>
            </div>
        </div>
    )
}