import { Link } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import "./Layout.scss"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { Menus } from "./menu"
import { useMeasure } from "react-use"

export default function Layout({
  title = "WhelpS",
  children,
  contentClassName = "",
  headerClass = "",
  headerStyle = null,
  visibleClass = true,
  visibleFooter = true,
}) {
  const [ref /*{ height, bottom }*/] = useMeasure()

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="Layout">
        <div
          // style={{ marginTop: height }}
          className="contentWrapper relative flex flex-col"
        >
          <main
            className={`container max-w-full mx-auto flex-grow flex flex-col ${contentClassName} ${visibleClass ? "" : "pb-0"} content`}
          >
            {children}
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}
