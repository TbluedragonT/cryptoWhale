import React from "react"

export default function Roadmap({ milestons }) {
  return (
    <div className="">
      <div className="hidden lg:flex flex-row">
        {milestons.slice(0, 5).map((dt, idx) => (
          <div className="flex flex-col" key={idx}>
            <div className="flex flex-row items-center">
              <div className="bg-secondary text-primary w-16 h-16 md:w-20 md:h-20 p-2 rounded-lg flex flex-row justify-center items-center">
                <span className="text-2xl md:text-4xl">{dt.value}</span>
                <span className="text-lg md:text-2xl">%</span>
              </div>
              <div
                className={`bg-secondary h-3 ${
                  idx === 4 ? "w-12 lg:w-16 xl:w-24" : "w-24 lg:w-16 xl:w-36"
                }`}
              ></div>
            </div>
            <p className="text-sm md:text-base text-secondary max-w-[130px] py-2">
              {dt.text}
            </p>
          </div>
        ))}
        <div className="flex-grow flex flex-col">
          <div className="h-[34px]"></div>
          <div className="w-3 flex-grow bg-secondary"></div>
        </div>
      </div>
      <div className="hidden lg:flex flex-row-reverse">
        <div className="flex-grow">
          <div className="w-3 h-8 md:h-[46px] bg-secondary"></div>
          <div className=""></div>
        </div>
        {milestons.slice(5, 10).map((dt, idx) => (
          <div className="flex flex-col" key={idx}>
            <div className="flex flex-row items-center">
              <div className="bg-secondary text-primary w-16 h-16 md:w-20 md:h-20 p-2 rounded-lg flex flex-row justify-center items-center">
                <span className="text-2xl md:text-4xl">{dt.value}</span>
                <span className="text-lg md:text-2xl">%</span>
              </div>
              <div
                className={`bg-secondary h-3 ${
                  idx === 0 ? "w-12 lg:w-16 xl:w-24" : "w-24 lg:w-16 xl:w-36"
                }`}
              ></div>
            </div>
            <p className="text-sm md:text-base text-secondary max-w-[120px] xl:max-w-[160px] py-2">
              {dt.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex lg:hidden flex-row">
        <div className="flex-grow"></div>
        {milestons.slice(0, 2).map((dt, idx) => (
          <div className="flex flex-col pb-4" key={idx}>
            <div className="flex flex-row items-center">
              <div className="border border-secondary bg-secondary text-primary w-16 h-16 md:w-20 md:h-20 p-2 rounded-lg flex flex-row justify-center items-center">
                <span className="text-2xl md:text-4xl">{dt.value}</span>
                <span className="text-lg md:text-2xl">%</span>
              </div>
              <div
                className={`border border-secondary bg-secondary h-3 ${
                  idx === 0
                    ? "min-w-[96px] md:min-w-[144px]"
                    : "min-w-[48px] md:min-w-[72px]"
                }`}
              ></div>
            </div>
            <p className="text-sm md:text-base text-secondary max-w-[80px] sm:max-w-[100px] py-2">
              {dt.text}
            </p>
          </div>
        ))}
        <div className="flex flex-col w-3 mr-4">
          <div className="h-[26px] md:h-[34px]"></div>
          <div className="w-3 flex-grow bg-secondary border border-secondary"></div>
        </div>
      </div>
      <div className="flex lg:hidden flex-row-reverse">
        <div className="flex flex-col w-3 mr-4">
          <div className="h-[38px] md:h-[46px] bg-secondary border border-secondary"></div>
        </div>
        {milestons.slice(2, 4).map((dt, idx) => (
          <div
            className={`flex flex-col ${idx === 1 && "items-center"} pb-4`}
            key={idx}
          >
            <div className="flex flex-row items-center">
              {idx === 1 && (
                <div
                  className={`border border-secondary bg-secondary h-3 min-w-[48px]`}
                ></div>
              )}
              <div className="border border-secondary bg-secondary text-primary w-16 h-16 md:w-20 md:h-20 p-2 rounded-lg flex flex-row justify-center items-center">
                <span className="text-2xl md:text-4xl">{dt.value}</span>
                <span className="text-lg md:text-2xl">%</span>
              </div>
              <div
                className={`border border-secondary bg-secondary h-3 min-w-[48px] md:min-w-[72px]`}
              ></div>
            </div>
            <p className="text-sm md:text-base text-secondary max-w-[80px] sm:max-w-[100px] py-2">
              {dt.text}
            </p>
          </div>
        ))}
        <div className="flex flex-col w-3 ml-4">
          <div className="h-[26px] md:h-[34px]"></div>
          <div className="w-3 flex-grow bg-secondary border border-secondary"></div>
        </div>
      </div>
      <div className="flex lg:hidden flex-row">
        <div className="flex flex-col w-3 ml-4">
          <div className="h-[38px] md:h-[46px] bg-secondary border border-secondary"></div>
        </div>
        {milestons.slice(4, 6).map((dt, idx) => (
          <div
            className={`flex flex-col ${idx === 0 && "items-center"} pb-4`}
            key={idx}
          >
            <div className="flex flex-row items-center">
              {idx === 0 && (
                <div
                  className={`border border-secondary bg-secondary h-3 min-w-[48px]`}
                ></div>
              )}
              <div className="border border-secondary bg-secondary text-primary w-16 h-16 md:w-20 md:h-20 p-2 rounded-lg flex flex-row justify-center items-center">
                <span className="text-2xl md:text-4xl">{dt.value}</span>
                <span className="text-lg md:text-2xl">%</span>
              </div>
              <div
                className={`border border-secondary bg-secondary h-3 min-w-[48px] md:min-w-[72px]`}
              ></div>
            </div>
            <p className="text-sm md:text-base text-secondary max-w-[80px] sm:max-w-[100px] py-2">
              {dt.text}
            </p>
          </div>
        ))}
        <div className="flex flex-col w-3 mr-4">
          <div className="h-[26px] md:h-[34px]"></div>
          <div className="w-3 flex-grow bg-secondary border border-secondary"></div>
        </div>
      </div>
      <div className="flex lg:hidden flex-row-reverse">
        <div className="flex flex-col w-3 mr-4">
          <div className="h-[38px] md:h-[46px] bg-secondary border border-secondary"></div>
        </div>
        {milestons.slice(6, 8).map((dt, idx) => (
          <div
            className={`flex flex-col ${idx === 1 && "items-center"} pb-4`}
            key={idx}
          >
            <div className="flex flex-row items-center">
              {idx === 1 && (
                <div
                  className={`border border-secondary bg-secondary h-3 min-w-[48px]`}
                ></div>
              )}
              <div className="border border-secondary bg-secondary text-primary w-16 h-16 md:w-20 md:h-20 p-2 rounded-lg flex flex-row justify-center items-center">
                <span className="text-2xl md:text-4xl">{dt.value}</span>
                <span className="text-lg md:text-2xl">%</span>
              </div>
              <div
                className={`border border-secondary bg-secondary h-3 min-w-[48px] md:min-w-[72px]`}
              ></div>
            </div>
            <p className="text-sm md:text-base text-secondary max-w-[80px] sm:max-w-[100px] py-2">
              {dt.text}
            </p>
          </div>
        ))}
        <div className="flex flex-col w-3 ml-4">
          <div className="h-[26px] md:h-[34px]"></div>
          <div className="w-3 flex-grow bg-secondary border border-secondary"></div>
        </div>
      </div>
      <div className="flex lg:hidden flex-row">
        <div className="flex flex-col w-3 ml-4">
          <div className="h-[38px] md:h-[46px] bg-secondary border border-secondary"></div>
        </div>
        {milestons.slice(8, 10).map((dt, idx) => (
          <div className="flex" key={idx}>
            <div
              className={`flex flex-col ${idx === 0 && "items-center"} pb-4`}
            >
              <div className="flex flex-row items-center">
                {idx === 0 && (
                  <div
                    className={`border border-secondary bg-secondary h-3 min-w-[48px]`}
                  ></div>
                )}
                <div className="border border-secondary bg-secondary text-primary w-16 h-16 md:w-20 md:h-20 p-2 rounded-lg flex flex-row justify-center items-center">
                  <span className="text-2xl md:text-4xl">{dt.value}</span>
                  <span className="text-lg md:text-2xl">%</span>
                </div>
                {idx === 0 && (
                  <div
                    className={`border border-secondary bg-secondary h-3 min-w-[48px] md:min-w-[72px]`}
                  ></div>
                )}
              </div>
              <p className="text-sm md:text-base text-secondary max-w-[80px] py-2">
                {dt.text}
              </p>
            </div>
            {idx === 0 && (
              <div
                className="flex h-16 md:h-20 items-center"
              >
                <div
                  className={`border border-secondary bg-secondary h-3 min-w-[48px] md:min-w-[72px]`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
