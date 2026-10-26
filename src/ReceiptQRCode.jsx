import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
// Импортируем картинку из папки проекта (путь укажи свой, где она у тебя лежит)
import qrcode from './assets/qrcode.jpg'; // Путь к картинке QR-кода

export default function ReceiptQRCode() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md">
      <QRCodeSVG 
        value="https://replastic.vercel.app/receipt" 
        size={140}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
        imageSettings={{
          // 3. Передаем импортированную переменную с картинкой сюда!
          src: qrcode, 
          height: 35,
          width: 35,
          excavate: true,
        }}
      />
      <span className="text-xs text-slate-500 mt-2 font-mono">Сканируй для бонусов</span>
    </div>
  );
}