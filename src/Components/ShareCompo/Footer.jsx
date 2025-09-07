import React from "react";

export default function Footer() {
  const footerData = [
    {
      title: "About Us",
      content: `We sell premium notebooks, planners, and stationery for creators and thinkers.
                Every page is designed to spark inspiration and help you organize your ideas beautifully.`,
      type: "text",
    },
    {
      title: "Customer Service",
      links: [
        { label: "Contact Us", href: "#" },
        { label: "Shipping & Delivery", href: "#" },
        { label: "Returns & Refunds", href: "#" },
        { label: "FAQs", href: "#" },
      ],
      type: "links",
    },
    {
      title: "Quick Links",
      links: [
        { label: "Shop All", href: "#" },
        { label: "Best Sellers", href: "#" },
        { label: "New Arrivals", href: "#" },
        { label: "Gift Cards", href: "#" },
      ],
      type: "links",
    },
    {
      title: "Follow Us",
      social: [
        { icon: "📘", color: "hover:text-blue-500", label: "Facebook", href: "#" },
        { icon: "📸", color: "hover:text-pink-500", label: "Instagram", href: "#" },
        { icon: "🐦", color: "hover:text-sky-400", label: "Twitter", href: "#" },
        { icon: "📌", color: "hover:text-red-500", label: "Pinterest", href: "#" },
      ],
      type: "social",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {footerData.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">{section.title}</h3>

            {section.type === "text" && (
              <p className="text-sm text-gray-400">{section.content}</p>
            )}

            {section.type === "links" && (
              <ul className="space-y-2 text-gray-400 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}


            {section.type === "social" && (
              <ul className="flex text-gray-400 space-x-4 text-lg">
                {section.social.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      aria-label={item.label}
                      className={item.color}
                    >
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
            )}

          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Notebook Store. All rights reserved.
      </div>

    </footer>
  );
}
