import React, {createContext, useState} from 'react';

export const QrContext = createContext();

export const QrContextProvider = ( props ) => {

  const [qrData, setQrData] = useState();

  const setQr = (data) => {
    console.log("Context st qr data : ",data);
    setQrData(data)
  }

  return(
    <QrContext.Provider
      value={{
        qrData,
        setQr
      }}>

      {props.children}

    </QrContext.Provider>
  )

}
