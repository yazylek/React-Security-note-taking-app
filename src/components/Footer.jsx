import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="m-auto w-full mx-auto container h-[1px] bg-black/20 mt-3">
        <div className="flex justify-between py-6 items-center container mx-auto">
          <div>
            <p>© {currentYear} Notees. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <p>Terms of Service</p>
            <p>Privacy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
