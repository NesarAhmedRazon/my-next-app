import style from "@styles/navs/mobile.module.scss";
import { motion, useCycle } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { decodeHTML, decodeXML } from "speedy-entities";

export default function MobileNav({ data }) {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const sidebar = {
    open: (height = 1000) => ({
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delayChildren: 0.2
      }
    }),
    closed: {
      x: -1000,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.5
      }
    }
  };
  const navVariants = {
    open: {
      height: `100vh`,
      width: `100%`,
      transition: {
        type: "",
        stiffness: 50,
        restDelta: 1,
        delayChildren: 0.2
      }
    },
    closed: {
      height: `100vh`,
      width: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.7
      }
    }
  };
  return (
    <motion.nav
      initial={false}
      custom={height}
      ref={containerRef}
      className={`${style.mobileNav} ${isOpen ? ` ${style.open}` : ``}`}
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
    >
      <motion.div className={`${style.background}`} variants={sidebar} />
      <MenuToggle style={style} toggle={() => toggleOpen()} />
      <MobileNavItem nav={data} style={style} toggle={() => toggleOpen()} />
    </motion.nav>
  );
}

// MenuToggleer -------------------------
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);
function MenuToggle({ toggle, style }) {
  return (
    <button onClick={toggle} className={style.navToggler}>
      <svg width="28" height="28" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" }
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" }
          }}
        />
      </svg>
    </button>
  );
}

// MenuToggleer -------------------------

const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, [ref]);

  return dimensions.current;
};

// MobileNavItem -------------------------
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

function MobileNavItem({ nav, style, toggle }) {
  return (
    <motion.ul variants={variants} className={style.navList}>
      {nav.map((navItem) => (
        <MenuItem
          data={navItem}
          style={style}
          key={navItem?.id}
          toggle={toggle}
        />
      ))}
    </motion.ul>
  );
}

const MenuItem = ({ data, style, toggle }) => {
  const variants = {
    open: {
      x: 0,

      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      x: -50,

      opacity: 0,
      transition: {
        y: { stiffness: 1000, velocity: 10 }
      }
    }
  };

  const nLabel = data?.label.replace(/(<([^>]+)>)|\xA0/gi, "").trim() || "";
  const title = data?.title || nLabel;
  const uri = data?.uri || "/";

  return (
    <motion.li
      id={data?.id}
      key={data?.id}
      className={`navLi`}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
    >
      <Link
        href={uri}
        className={`${style.navitem}`}
        title={decodeHTML(decodeXML(title))}
      >
        {nLabel}
      </Link>
    </motion.li>
  );
};
// MobileNavItem -------------------------
