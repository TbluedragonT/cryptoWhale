import { Link } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import "@styles/global.scss"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { menus, footerLinks } from "./menu"
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
      <div className="bg-secondary min-h-screen flex flex-col font-recoleta font-medium">
        <Disclosure
          as="nav"
          className={`top-0 absolute z-50 w-full px-0 ${headerClass} ${
            visibleClass ? "block" : "hidden"
          } `}
          style={headerStyle}
        >
          {({ open }) => (
            <>
              <div>
                <div className="container mx-auto lg:pt-8">
                  <div className="relative flex items-center">
                    <div className="flex flex-row justify-end min-w-full">
                      <div className="hidden lg:block">
                        <div className="flex space-x-4">
                          <div>
                            <ul className="flex items-center">
                              {menus.map(dt => (
                                <li
                                  className="cursor-pointer font-recoleta-bold text-xl xl:text-2xl text-secondary py-2 px-3"
                                  key={dt.name}
                                >
                                  {dt.type == "internal" ? (
                                    <Link
                                      activeClassName="active"
                                      to={dt.path}
                                      partiallyActive={!!dt.partiallyActive}
                                      target={dt.target}
                                    >
                                      {dt.name}
                                    </Link>
                                  ) : (
                                    <a
                                      className="no-underline px-5"
                                      href={dt.path}
                                      target={dt.target}
                                    >
                                      {dt.name}
                                    </a>
                                  )}
                                </li>
                              ))}
                              <li className="py-2 pl-3">
                                <button
                                  id="join_discord"
                                  className="flex justify-center gap-2 items-center bg-primary-lightest hover:bg-primary font-recoleta-bold text-xl xl:text-2xl py-2 xl:py-4 px-8 tracking-wide w-full rounded-full"
                                >
                                  <span className="text-secondary tracking-wider">
                                    Join our Discord
                                  </span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-y-6 right-0 flex items-center lg:hidden">
                      {/* Mobile menu button*/}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="lg:hidden bg-primary">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <div>
                    <ul className="flex-col">
                      {menus.map(dt => (
                        <li
                          className="py-2 px-3 text-secondary text-lg text-center font-recoleta-bold"
                          key={dt.name}
                        >
                          <Link
                            activeClassName="active"
                            to={dt.path}
                            target={dt.target}
                          >
                            {dt.name}
                          </Link>
                        </li>
                      ))}
                      <li className="py-2 px-3 w-full">
                        <div className="flex flex-row justify-center">
                          <button
                            id="join_discord"
                            className="flex justify-center gap-2 items-center bg-primary-lightest hover:bg-primary font-recoleta-bold text-lg py-2 px-8 tracking-wide rounded-full"
                          >
                            <span className="text-secondary tracking-wider">
                              Join our Discord
                            </span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="relative flex flex-col">
          <main
            className={`max-w-full mx-auto flex-grow flex flex-col ${contentClassName} ${
              visibleClass ? "" : "pb-0"
            }`}
          >
            {children}
          </main>
        </div>

        <div
          className={`bg-primary relative min-w-full ${
            visibleClass && visibleFooter ? "block" : "hidden"
          } `}
        >
          <div className="flex flex-col lg:w-3/5 mx-auto py-20">
            <div className="flex flex-col lg:flex-row lg:justify-between relative items-center">
              <div className="w-1/3 lg:w-1/4 flex flex-col py-10 lg:py-0 items-center">
                <img src="/footer-logo.svg" className="w-4/5" />
              </div>
              <div className="w-2/3 flex flex-col lg:flex-row lg:justify-around">
                {footerLinks.map(dt => (
                  <div key={dt.heading} className="mx-3 mb-5 lg:mb-0">
                    <div className="text-center lg:text-left text-secondary text-lg md:text-2xl capitalize font-recoleta-bold">
                      {dt.heading}
                    </div>
                    <ul>
                      {dt.links.map(sb => (
                        <li
                          className="text-secondary text-center lg:text-left my-3 font-medium text-sm md:text-lg"
                          key={sb.label}
                        >
                          {sb.type == "internal" ? (
                            <Link to={sb.link}>{sb.label}</Link>
                          ) : (
                            <a href={sb.link}>{sb.label}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="w-2/3 lg:w-1/3 flex flex-col justify-center items-center lg:justify-end lg:items-end py-8 lg:py-0 mx-auto lg:mx-0">
                  <p className="text-secondary">Powered by</p>
                  <Link to={"http://masterbrews.cards/"}>
                    <img src="/brew-logo.png" className="cursor-pointer"/>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between pt-16">
              <div className="text-secondary text-lg mx-auto lg:mx-0 py-2 lg:py-0">
                @2021 Crypto Whale Club
              </div>
              {/* <div className="flex flex-col md:flex-row md:space-x-8 mx-auto">
                <a className="text-secondary text-center text-sm md:text-base py-2 md:py-0" href="/" target="_blank">
                  Terms of Service
                </a>
                <a className="text-secondary text-center text-sm md:text-base py-2 md:py-0" href="/" target="_blank">
                  Privacy Policy
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
