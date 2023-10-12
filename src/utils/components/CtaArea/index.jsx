import Image from "next/image";
import Link from "next/link";
import style from "./ctaarea.module.scss";

export default function CtaArea(props) {
  const { ctaTitle, ctaImage, className } = props;
  const classes = className ?? "";
  return (
    <>
      <div className={`${style.container} ${classes}`}>
        {typeof ctaTitle !== "undefined" && (
          <div className={style.ctaTitle}>{ctaTitle}</div>
        )}
        {typeof ctaImage !== "undefined" && (
          <Image
            alt="3 track simplified final"
            className={style.ctaImage}
            src={ctaImage}
            width={2048}
            height={433}
          />
        )}
        <p className="lead">
          Start automating workflows now with your free 14-day trial of Tallyfy
        </p>
        <div className={style.btnContainer}>
          <Link href="/" className="button orange">
            Try Tallyfy free
          </Link>
          <Link href="/" className="button darkGray">
            Discuss my Questions
          </Link>
        </div>
      </div>
    </>
  );
}
