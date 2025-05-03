import TaskContainer from "@/components/misc/taskContainer";
import DailyReward from "@/components/misc/daily";
import { useTranslation } from "react-i18next";

export default function Tasks() {
  const { t } = useTranslation();

  return (
    <div className={"px-[20px]"}>
      <div className={"sections_taper"}>
        <div className={"award blue-background"}>
          <div className={"award_top"}>
            <img src={"/media/images/tasks.png"} />
            <div className={"flex flex-col gap-[2px]"}>
              <div className={"award_top_title"}>
                {t("tasks.rewardHintTitle")}
              </div>
              <div className={"award_top_description"}>
                {t("tasks.rewardHintDescription")}
              </div>
            </div>
          </div>
          <DailyReward />
        </div>
      </div>

      <div className={"tasks pt-[20px]"}>
        <div className={"tasks_title"}>{t("tasks.listTitle")}</div>
        <TaskContainer />
      </div>
    </div>
  );
}
