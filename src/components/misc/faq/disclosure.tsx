import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useTranslation } from "react-i18next";

export default function DisclosureFAQ() {
  const { t } = useTranslation();

  return (
    <>
      <Disclosure>
        <DisclosureButton>
          <div className="fag_question py-[20px] px-[16px]">
            <div className="fag_question_text">{t("faq.questions.q1")}</div>
          </div>
        </DisclosureButton>
        <DisclosurePanel>{t("faq.questions.answer_default")}</DisclosurePanel>
      </Disclosure>
      <Disclosure>
        <DisclosureButton>
          <div className="fag_question py-[20px] px-[16px]">
            <div className="fag_question_text">{t("faq.questions.q2")}</div>
          </div>
        </DisclosureButton>
        <DisclosurePanel>{t("faq.questions.answer_default")}</DisclosurePanel>
      </Disclosure>
      <Disclosure>
        <DisclosureButton>
          <div className="fag_question py-[20px] px-[16px]">
            <div className="fag_question_text">{t("faq.questions.q3")}</div>
          </div>
        </DisclosureButton>
        <DisclosurePanel>{t("faq.questions.answer_default")}</DisclosurePanel>
      </Disclosure>
      <Disclosure>
        <DisclosureButton>
          <div className="fag_question py-[20px] px-[16px]">
            <div className="fag_question_text">{t("faq.questions.q4")}</div>
          </div>
        </DisclosureButton>
        <DisclosurePanel>{t("faq.questions.answer_default")}</DisclosurePanel>
      </Disclosure>
    </>
  );
}
