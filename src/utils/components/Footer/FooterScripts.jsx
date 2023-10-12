"use client";

import HtmlParser from "@tools/HtmlParser";
import React from "react";

export default function FooterScripts({ script }) {
  return <HtmlParser string={script} />;
}
