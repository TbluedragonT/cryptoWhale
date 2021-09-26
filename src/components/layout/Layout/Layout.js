import { Link } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import "./Layout.scss"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { Menus } from "./menu"
import { useMeasure } from "react-use"

const icons = [
  { icon: '/icon/twitter.svg', link: "https://twitter.com/wallet_winners" },
  { icon: '/icon/discord.svg', link: "https://discord.gg/BR2mXYpQJr" },
]

export default function Layout({
  title = "WhelpS",
  children,
  contentClassName = "",
  headerClass = "",
  headerStyle = null,
  visibleClass = true,
  visibleFooter = true
}) {
  const [ref, /*{ height, bottom }*/] = useMeasure()

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="Layout">
        <Disclosure
          as="nav"
          ref={ref}
          className={`header fixed z-50 w-full px-0 py-1 ${headerClass} ${visibleClass ? "sm:hidden" : "hidden"}`}
          style={headerStyle}
        >
          {({ open }) => (
            <>
              <div ref={ref}>
                <div className="container py-0 mx-auto md:py-0">
                  <div className="relative flex items-center justify-between h-12">
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md menuToggleIcon focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block w-6 h-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block w-6 h-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="bg-black sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <div>
                    <ul className="flex-col navMenus">
                      {Menus.map(dt => (
                        <li className="font-ocr px-3 py-2 text-primary" key={dt.name}>
                          <Link
                            activeClassName="active"
                            to={dt.path}
                            target={dt.target}
                          >
                            {dt.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div
          // style={{ marginTop: height }}
          className="relative flex flex-col contentWrapper bg-secondary"
        >
          <main
            className={`pt-12 sm:pt-0 font-ocr container mx-auto flex-grow flex flex-col ${contentClassName} ${visibleClass ? '' : 'pb-0'} `}
          >
            {children}
          </main>
        </div>

        <div className="min-w-full footerWrapper">
          <div className="flex flex-col md:flex-row items-center w-full footer justify-center border-t border-secondary">
            <div className="flex flex-row w-full md:w-1/2 justify-between bg-primary px-2 lg:px-10">
              <div className="flex flex-row font-bajt text-4xl text-secondary italic bold items-center">
                <img src="/logo.png" className="w-10 h-10"></img>
                <div className="uppercase text-lg font-extrabold ml-2">
                  WalletWinners
                </div>
              </div>
              <div className="flex justify-center mt-4 mb-4 align-middle">
                <ul className="flex justify-between flex-grow">
                  {icons.map((dt, idx) => {
                    return (
                      <a
                        href={dt.link}
                        target="_blank"
                        rel="noreferrer"
                        key={idx}
                      >
                        <img src={dt.icon} alt="" className="mx-2" />
                      </a>
                    )
                  }
                  )}
                </ul>
              </div>
            </div>
            <nav className="w-full md:w-1/2 py-2 md:py-0">
              <div className="flex justify-center space-x-4 font-ocr">
                <div>
                  <ul className="navMenus">
                    {Menus.map(dt => (
                      <li className="py-2 px-3 text-primary" key={dt.name} >
                        {dt.type == 'internal' ?
                          <Link
                            activeClassName="active"
                            to={dt.path}
                            partiallyActive={!!dt.partiallyActive}
                            target={dt.target}
                          >
                            {dt.name}
                          </Link>
                          :
                          <a href={dt.path} target={dt.target}>
                            {dt.name}
                          </a>
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="flex items-center justify-center pb-5 text-white border-t border-secondary">
            <div className="text-lg font-light leading-8 text-white font-roboto-light">
              Powered by
            </div>
            <a href="https://masterbrews.com/" target="_blank" rel="noreferrer">
              <img src="/mb-logo.png" alt="" className="ml-3 md:max-w-xs" width="250" />
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
