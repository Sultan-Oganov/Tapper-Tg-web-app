import CheckForm from "@/components/misc/check/CheckForm";
import CheckResult from "@/components/misc/check/checkResult";

export default function Check(){
    return (
        <div className={"px-[20px]"}>
            <CheckForm />
            <div className={"check_buttons"}>
                <CheckResult />
            </div>
        </div>
    )
}