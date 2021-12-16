import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Link as ScrollLink } from "react-scroll"
import { connect } from "react-redux"
import "@styles/global.scss"
import { Disclosure } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { ChainID, getWeb3, getOnBoard } from "../../../util/wallet"
import { menus, stakeMenus, footerLinks } from "./menu"
import { discordLink, twitterLink, openseaLink, cryptowhaleclubLink } from "./menu"
import { setWeb3, setOnBoard, setWalletAddress, setConnected } from "../../../state/actions"

const Layout = ({
  title = "CWC",
  children,
  contentClassName = "",
  headerClass = "",
  headerStyle = null,
  visibleClass = true,
  visibleFooter = true,
  page = "home",
  web3,
  onBoard,
  walletAddress,
  connected,
  setWeb3,
  setOnBoard,
  setConnected,
  setWalletAddress
}) => {
  const [scrolled, setScrolled] = useState(false)
  const MainMenus = page === "dashboard" ? stakeMenus : menus;
  const socialLinks = [
    {
      link: discordLink,
      icon: '/icon/icon-discord.svg'
    },
    {
      link: twitterLink,
      icon: '/icon/icon-twitter.svg'
    },
    {
      link: openseaLink,
      icon: '/icon/icon-opensea.png'
    }
  ]

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  })

  useEffect(() => {
    setWeb3(window.__web3 || null);
    setOnBoard(window.__onboard || null);
    setWalletAddress(window.__walletAddress || null);
    setConnected(window.__connected || false);
  }, []);

  useEffect(() => {
    window.__web3 = web3;
  }, [web3]);
  useEffect(() => {
    window.__onboard = onBoard;
  }, [onBoard]);
  useEffect(() => {
    window.__walletAddress = walletAddress;
  }, [walletAddress]);
  useEffect(() => {
    window.__connected = connected;
  }, [connected]);

  useEffect(() => {
    if (web3) {
      addressAvailable();
    }
  }, [web3]);

  const addressAvailable = () => {
    if (walletAddress) {
      return;
    }

    if (web3 && web3.currentProvider && web3.currentProvider.selectedAddress &&
      (web3.currentProvider.selectedAddress.length > 0)) {
      setWalletAddress(web3.currentProvider.selectedAddress);
    } else {
      setTimeout(addressAvailable, 100);
    }
  }

  useEffect(() => {
    async function walletInitialize() {
      const _web3 = await getWeb3()
      const _onBoard = await getOnBoard()
      const _chainId = await _web3.eth.getChainId()
      const _address = await _web3.eth.getAccounts()

      setWeb3(_web3)
      setOnBoard(_onBoard)
      if (_address[0] && _chainId === ChainID)
        setConnected(true)

      setWalletAddress(_address[0])
    }

    if (typeof window !== "undefined") {
      if (window.ethereum) {

        window.ethereum.on('chainChanged', handleNetworkChange);
        window.ethereum.on('disconnect', logout);
        window.ethereum.on('accountsChanged', logout);
      }
    }

    walletInitialize()
  }, [])

  const connectHandler = async () => {
    if (onBoard !== null) {
      if (!(await onBoard.walletSelect())) {
        return;
      }
      setConnected(await onBoard.walletCheck())
      console.log(await onBoard.walletCheck())
    }
  }

  const logout = () => {
    if (onBoard != null) {
      onBoard.walletReset();
    }
    setConnected(false);
  }

  const handleNetworkChange = (networkId) => {
    logout();
    if (networkId != '0x1') {
      displayNotify("warning", "You should choose Ethereum main network!")
    }
  }

  const displayNotify = (type, content) => {
    setAlertState({
      open: true,
      message: content,
      severity: type,
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", _ => {
      setScrolled(window.scrollY > 60)
    })
  })

  const sliceAddress = val => {
    return val.slice(0, 6) + "..." + val.slice(-4)
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {page === "mint" ? (
        <div className="relative flex flex-col">{children}</div>
      ) : (
        <div className="bg-secondary min-h-screen flex flex-col font-recoleta font-medium">
          <Disclosure
            as="nav"
            className={`top-0 fixed z-50 w-full px-0 ${scrolled ? "bg-primary" : "bg-none"
              } ${headerClass} ${visibleClass ? "block" : "hidden"} `}
            style={headerStyle}
          >
            {({ open }) => (
              <>
                <div>
                  <div className="container mx-auto lg:pt-2">
                    <div
                      className={`relative flex ${scrolled ? "justify-between" : "justify-end"
                        } items-center`}
                    >
                      {scrolled && (
                        <Link to={"/"}>
                          <img
                            src="/hero-logo.svg"
                            className="h-12 lg:h-24 py-2"
                          />
                        </Link>
                      )}{" "}
                      <div className="flex flex-row justify-end">
                        <div className={`hidden lg:block`}>
                          <div className="flex space-x-4">
                            <div>
                              <ul className="flex items-center">
                                {MainMenus.map(dt => (
                                  <li
                                    className="cursor-pointer font-recoleta-bold text-xl xl:text-2xl text-secondary hover:bg-primary rounded-lg py-2 px-3"
                                    key={dt.name}
                                  >
                                    {dt.type == "internal" ? (
                                      <ScrollLink
                                        to={dt.path}
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                      >
                                        {dt.name}
                                      </ScrollLink>
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
                                  {
                                    connected ? (
                                      <div
                                        className="text-white border-2 rounded-md px-1 py-1 whitespace-nowrap"
                                      >
                                        {sliceAddress(walletAddress)}
                                      </div>
                                    ) : (
                                      <button
                                        className="text-white border-2 rounded-md px-1 py-1 whitespace-nowrap"
                                        onClick={connectHandler}
                                      >
                                        Connect Wallet
                                      </button>
                                    )
                                  }
                                </li>
                                {
                                  socialLinks.map((item, index) => {
                                    return (
                                      <li
                                        key={index}
                                        className="py-2 pl-3"
                                      >
                                        <a
                                          className="flex justify-center gap-2 items-center hover:bg-primary font-recoleta-bold text-xl xl:text-2xl py-3 px-3 tracking-wide w-full rounded-lg my-2"
                                          href={item.link}
                                          target="_blank"
                                        >
                                          <img
                                            src={item.icon}
                                            className="w-10"
                                          />
                                        </a>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-y-6 right-0 flex items-center lg:hidden">
                        {/* Mobile menu button*/}
                        {!open && (<a href={cryptowhaleclubLink} className="main-button mobile">Mint</a>)}
                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
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
                        {MainMenus.map(dt => (
                          <li
                            className="py-2 px-3 text-secondary text-lg text-center font-recoleta-bold"
                            key={dt.name}
                          >
                            {dt.type == "internal" ? (
                              <ScrollLink
                                to={dt.path}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                              >
                                {dt.name}
                              </ScrollLink>
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
                        <li className="py-2 px-3 text-center">
                          {
                            connected ? (
                              <span
                                className="text-white border-2 rounded-md px-1 py-1 whitespace-nowrap"
                              >
                                {sliceAddress(walletAddress)}
                              </span>
                            ) : (
                              <button
                                className="text-white border-2 rounded-md px-1 py-1 whitespace-nowrap"
                                onClick={connectHandler}
                              >
                                Connect Wallet
                              </button>
                            )
                          }
                        </li>
                        <li className="py-2 px-3 w-full">
                          <div className="flex flex-row justify-center gap-3">
                            {
                              socialLinks.map((item, index) => {
                                return (
                                  <a
                                    key={index}
                                    className="flex justify-center items-center font-recoleta-bold py-3 px-3 my-2"
                                    href={item.link}
                                    target="_blank"
                                  >
                                    <img
                                      src={item.icon}
                                      className="w-10"
                                    />
                                  </a>
                                )
                              })
                            }
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
              className={`max-w-full  flex-grow flex flex-col ${contentClassName} ${visibleClass ? "" : "pb-0"
                }`}
            >
              {children}
            </main>
          </div>

          <div
            className={`bg-primary relative min-w-full ${visibleClass && visibleFooter ? "block" : "hidden"
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
                              <ScrollLink
                                to={sb.link}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="cursor-pointer"
                              >
                                {sb.label}
                              </ScrollLink>
                            ) : (
                              <a href={sb.link} target="_blank">
                                {sb.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end pt-16">
                <div className="text-secondary text-lg mx-auto lg:mx-0 py-2 lg:py-0">
                  @2021 Crypto Whale Club
                </div>
                <div className="w-2/3 lg:w-1/3 flex flex-col justify-center items-center lg:justify-end lg:items-end py-8 lg:py-0 mx-auto lg:mx-0">
                  <p className="text-secondary">Powered by</p>
                  <a href={"http://masterbrews.cards/"} target="_blank">
                    <img src="/brew-logo.png" className="cursor-pointer" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Snackbar
            open={alertState.open}
            autoHideDuration={6000}
            onClose={() => setAlertState({ ...alertState, open: false })}
          >
            <Alert
              onClose={() => setAlertState({ ...alertState, open: false })}
              severity={alertState.severity}
            >
              {alertState.message}
            </Alert>
          </Snackbar>
        </div>
      )}
    </React.Fragment>
  )
}

const stateProps = (state) => ({
  web3: state.web3,
  onBoard: state.onBoard,
  walletAddress: state.walletAddress,
  connected: state.connected
});

const dispatchProps = (dispatch) => ({
  setWeb3: (data) => dispatch(setWeb3(data)),
  setOnBoard: (data) => dispatch(setOnBoard(data)),
  setWalletAddress: (address) => dispatch(setWalletAddress(address)),
  setConnected: (status) => dispatch(setConnected(status))
})

export default connect(stateProps, dispatchProps)(Layout);
