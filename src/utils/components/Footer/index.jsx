import ProgressBar from "@components/ProgressBar";
import HtmlParser from "@tools/HtmlParser";
import CopyrightBar from "./CopyrightBar";
import CtaRow from "./CtaRow";
import FooterWids from "./FooterWids";
export default function Footer(props) {
  return (
    <>
      <footer className={`footer`}>
        <FooterWids data={props?.option?.widgets} />
        <CtaRow data={props?.option?.ctaRow} />
        <CopyrightBar data={props?.option?.copyright} />
        <ProgressBar />
      </footer>
      {<HtmlParser string={props?.script} />}
    </>
  );
}
