// // src/pages/GuidesPage.jsx
// import React, { useState } from "react";

// // Small reusable components
// const SearchBar = ({ value, onChange }) => (
//   <div className="flex items-center gap-2 mb-4">
//     <input
//       value={value}
//       onChange={onChange}
//       placeholder="Search guides, e.g. 'mortgage', 'inspection', 'renting'"
//       className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
//     />
//     <button
//       className="px-4 py-2 bg-[#383F4C] text-white rounded hover:bg-[#2e3440]"
//       onClick={() => onChange({ target: { value: "" } })}
//       title="Clear search"
//     >
//       Clear
//     </button>
//   </div>
// );

// const Collapsible = ({ title, children, defaultOpen = false }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div className="border rounded mb-3">
//       <button
//         onClick={() => setOpen((s) => !s)}
//         className="w-full text-left px-4 py-3 flex justify-between items-center bg-gray-50"
//       >
//         <span className="font-semibold">{title}</span>
//         <span className="text-sm text-gray-600">{open ? "-" : "+"}</span>
//       </button>
//       {open && <div className="p-4 bg-white">{children}</div>}
//     </div>
//   );
// };

// // Friendly, short terms for glossary
// const Glossary = ({ terms }) => (
//   <div className="space-y-3">
//     {terms.map((t) => (
//       <div key={t.term}>
//         <p className="font-semibold">{t.term}</p>
//         <p className="text-sm text-gray-700">{t.definition}</p>
//       </div>
//     ))}
//   </div>
// );

// export default function GuidesPage() {
//   const [query, setQuery] = useState("");

//   const sections = [
//     {
//       id: "buying",
//       title: "Buying a Property",
//       summary:
//         "Steps and friendly tips for finding, inspecting, financing, and closing on a home.",
//       content: (
//         <ul className="list-disc pl-6 space-y-2 text-gray-700">
//           <li>Research areas and budgets.</li>
//           <li>Get pre-approved for a loan.</li>
//           <li>Inspect properties in person.</li>
//           <li>Hire professionals for inspection.</li>
//           <li>Negotiate, sign, and close safely.</li>
//         </ul>
//       ),
//     },
//     {
//       id: "selling",
//       title: "Selling a Property",
//       summary:
//         "How to prepare, price, and market your property for the best outcome.",
//       content: (
//         <ul className="list-disc pl-6 space-y-2 text-gray-700">
//           <li>Gather all ownership and tax documents.</li>
//           <li>Stage your home to look appealing.</li>
//           <li>Get a valuation and set a fair price.</li>
//           <li>Advertise on multiple platforms.</li>
//           <li>Negotiate with buyers and close legally.</li>
//         </ul>
//       ),
//     },
//     {
//       id: "renting",
//       title: "Renting",
//       summary:
//         "Friendly steps for finding, inspecting, and securing a rental home.",
//       content: (
//         <ul className="list-disc pl-6 space-y-2 text-gray-700">
//           <li>Check affordability and rental duration.</li>
//           <li>Inspect for water, electricity, and safety.</li>
//           <li>Take photos before moving in.</li>
//           <li>Sign a written tenancy agreement.</li>
//           <li>Pay securely and collect receipts.</li>
//         </ul>
//       ),
//     },
//     {
//       id: "leasing",
//       title: "Leasing",
//       summary:
//         "Tips for long-term property use agreements like shops, offices, and land.",
//       content: (
//         <ul className="list-disc pl-6 space-y-2 text-gray-700">
//           <li>Understand lease duration and renewal terms.</li>
//           <li>Confirm landlord’s ownership rights.</li>
//           <li>Check if you can sublet or modify the space.</li>
//           <li>Document all agreements in writing.</li>
//         </ul>
//       ),
//     },
//     {
//       id: "building",
//       title: "Building",
//       summary:
//         "Simple guide to planning and constructing a safe, lasting home or structure.",
//       content: (
//         <ul className="list-disc pl-6 space-y-2 text-gray-700">
//           <li>Secure land with valid documents.</li>
//           <li>Hire an architect and engineer.</li>
//           <li>Budget for permits and approvals.</li>
//           <li>Use quality materials.</li>
//           <li>Supervise regularly or hire a project manager.</li>
//         </ul>
//       ),
//     },
//     {
//       id: "maintenance",
//       title: "Home Maintenance",
//       summary:
//         "Keep your property safe and valuable with routine checks and repairs.",
//       content: (
//         <ul className="list-disc pl-6 space-y-2 text-gray-700">
//           <li>Check roof, plumbing, and wiring every year.</li>
//           <li>Service air conditioning and generators regularly.</li>
//           <li>Keep drains and gutters unclogged.</li>
//           <li>Repaint to prevent dampness and cracks.</li>
//         </ul>
//       ),
//     },
//     {
//       id: "booking",
//       title: "Booking",
//       summary:
//         "Reserve property tours, short stays, or temporary rentals with ease.",
//       content: (
//         <ul className="list-disc pl-6 space-y-2 text-gray-700">
//           <li>Always confirm booking with payment receipts.</li>
//           <li>Read cancellation and refund rules.</li>
//           <li>Book through verified platforms or agents.</li>
//           <li>Inspect the space before final payment.</li>
//         </ul>
//       ),
//     },
//   ];

//   const glossary = [
//     { term: "Title deed", definition: "Official document showing property ownership." },
//     { term: "Survey plan", definition: "Map showing exact property boundaries." },
//     { term: "Deposit", definition: "Upfront money paid to secure a property." },
//     { term: "Conveyancing", definition: "Legal transfer of property from one owner to another." },
//   ];

//   // Filter sections by query
//   const visible = sections.filter(
//     (s) =>
//       s.title.toLowerCase().includes(query.toLowerCase()) ||
//       s.summary.toLowerCase().includes(query.toLowerCase()) ||
//       JSON.stringify(s.content).toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="md:mt-0 mt-16 max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">
//         Guides — Easy, plain-language help for property
//       </h1>

//       <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />

//       <p className="mb-6 text-gray-700">
//         Choose a topic below to expand it. If you need more detail, press
//         "Contact Support" at the end of each guide.
//       </p>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           {visible.length > 0 ? (
//             visible.map((s) => (
//               <Collapsible key={s.id} title={s.title}>
//                 <p className="text-sm text-gray-600 mb-3">{s.summary}</p>
//                 {s.content}
//                 <div className="mt-4 flex gap-2">
//                   <button className="px-3 py-2 bg-[#383F4C] text-white rounded hover:bg-[#2e3440]">
//                     Download Checklist
//                   </button>
//                   <button className="px-3 py-2 border rounded">
//                     Contact Support
//                   </button>
//                 </div>
//               </Collapsible>
//             ))
//           ) : (
//             <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
//               No guides found for "{query}". Please try another keyword.
//             </div>
//           )}
//         </div>

//         <aside className="space-y-4">
//           <div className="border rounded p-4 sticky top-6 bg-white">
//             <h3 className="font-semibold mb-2">Quick Glossary</h3>
//             <Glossary terms={glossary} />
//           </div>

//           <div className="border rounded p-4 bg-white">
//             <h3 className="font-semibold mb-2">Useful Checklists</h3>
//             <ul className="list-disc pl-6 text-gray-700">
//               <li>Buying checklist (inspect, documents, offer)</li>
//               <li>Rental move-in checklist (photos, meter readings)</li>
//               <li>Selling checklist (staging, documents, valuation)</li>
//             </ul>
//             <div className="mt-3 flex gap-2">
//               <button className="px-3 py-2 bg-[#383F4C] text-white rounded hover:bg-[#2e3440]">
//                 Download All PDFs
//               </button>
//               <button className="px-3 py-2 border rounded">Print Guide</button>
//             </div>
//           </div>

//           <div className="border rounded p-4 bg-white">
//             <h3 className="font-semibold mb-2">Need help?</h3>
//             <p className="text-sm text-gray-700">
//               If something is confusing, contact our support team or request a
//               one-on-one consultation with an agent.
//             </p>
//             <div className="mt-3">
//               <button className="px-3 py-2 bg-[#383F4C] text-white rounded w-full hover:bg-[#2e3440]">
//                 Contact Support
//               </button>
//             </div>
//           </div>
//         </aside>
//       </div>

//       <div className="mt-8 text-sm text-gray-600">
//         <p className="font-semibold mb-2">Terms written simply</p>
//         <p>
//           We explained legal, finance, and property words above in the quick
//           glossary so you don’t need to read confusing legal pages. For a fuller
//           explanation, click any term and ask support for a breakdown in simple
//           examples.
//         </p>
//       </div>
//     </div>
//   );
// }

// GuidesPage.jsx
import React, { useState } from "react";

// Small reusable components
const SearchBar = ({ value, onChange }) => (
  <div className="flex items-center gap-2 mb-4">
    <input
      value={value}
      onChange={onChange}
      placeholder="Search guides, e.g. 'mortgage', 'inspection'"
      className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
    />
    <button
      className="px-4 py-2 bg-[#383F4C] text-white rounded hover:bg-[#2e3440]"
      onClick={() => onChange({ target: { value: "" } })}
      title="Clear search"
    >
      Clear
    </button>
  </div>
);

const Collapsible = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded mb-3">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full text-left px-4 py-3 flex justify-between items-center bg-gray-50"
      >
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-gray-600">{open ? "-" : "+"}</span>
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

const Glossary = ({ terms }) => (
  <div className="space-y-3">
    {terms.map((t) => (
      <div key={t.term}>
        <p className="font-semibold">{t.term}</p>
        <p className="text-sm text-gray-700">{t.definition}</p>
      </div>
    ))}
  </div>
);

export default function GuidesPage() {
  const [query, setQuery] = useState("");

  // Guides
 const sections = [
    {
      id: "buying",
      title: "Buying a Property",
      summary:
        "Steps and friendly tips for finding, inspecting, financing, and closing on a home.",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Research areas and budgets.</li>
          <li>Get pre-approved for a loan.</li>
          <li>Inspect properties in person.</li>
          <li>Hire professionals for inspection.</li>
          <li>Negotiate, sign, and close safely.</li>
        </ul>
      ),
    },
    {
      id: "selling",
      title: "Selling a Property",
      summary:
        "How to prepare, price, and market your property for the best outcome.",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Gather all ownership and tax documents.</li>
          <li>Stage your home to look appealing.</li>
          <li>Get a valuation and set a fair price.</li>
          <li>Advertise on multiple platforms.</li>
          <li>Negotiate with buyers and close legally.</li>
        </ul>
      ),
    },
    {
      id: "renting",
      title: "Renting",
      summary:
        "Friendly steps for finding, inspecting, and securing a rental home.",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Check affordability and rental duration.</li>
          <li>Inspect for water, electricity, and safety.</li>
          <li>Take photos before moving in.</li>
          <li>Sign a written tenancy agreement.</li>
          <li>Pay securely and collect receipts.</li>
        </ul>
      ),
    },
    {
      id: "leasing",
      title: "Leasing",
      summary:
        "Tips for long-term property use agreements like shops, offices, and land.",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Understand lease duration and renewal terms.</li>
          <li>Confirm landlord’s ownership rights.</li>
          <li>Check if you can sublet or modify the space.</li>
          <li>Document all agreements in writing.</li>
        </ul>
      ),
    },
    {
      id: "building",
      title: "Building",
      summary:
        "Simple guide to planning and constructing a safe, lasting home or structure.",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Secure land with valid documents.</li>
          <li>Hire an architect and engineer.</li>
          <li>Budget for permits and approvals.</li>
          <li>Use quality materials.</li>
          <li>Supervise regularly or hire a project manager.</li>
        </ul>
      ),
    },
    {
      id: "maintenance",
      title: "Home Maintenance",
      summary:
        "Keep your property safe and valuable with routine checks and repairs.",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Check roof, plumbing, and wiring every year.</li>
          <li>Service air conditioning and generators regularly.</li>
          <li>Keep drains and gutters unclogged.</li>
          <li>Repaint to prevent dampness and cracks.</li>
        </ul>
      ),
    },
    {
      id: "booking",
      title: "Booking",
      summary:
        "Reserve property tours, short stays, or temporary rentals with ease.",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Always confirm booking with payment receipts.</li>
          <li>Read cancellation and refund rules.</li>
          <li>Book through verified platforms or agents.</li>
          <li>Inspect the space before final payment.</li>
        </ul>
      ),
    },
  ];

  // Glossary terms
  const glossary = [
    { term: "Title deed", definition: "Official document showing who legally owns the property." },
    { term: "Survey plan", definition: "Map of the property showing its exact boundaries." },
    { term: "Deposit", definition: "Money paid upfront to show you intend to buy or rent." },
    { term: "Conveyancing", definition: "The legal process of transferring property ownership." },
  ];

  // Filter logic (SAFE: no JSON.stringify on JSX)
  const visible = sections.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      (s.searchText && s.searchText.toLowerCase().includes(q))
    );
  });

  return (
    <div className="md:mt-0 mt-16 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Guides — Easy, plain-language help for property
      </h1>

      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />

      <p className="mb-6 text-gray-700">
        Choose a topic below to expand it. If you need more detail, press
        "Contact Support" at the end of each guide.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          {visible.length > 0 ? (
            visible.map((s) => (
              <Collapsible key={s.id} title={s.title}>
                <p className="text-sm text-gray-600 mb-3">{s.summary}</p>
                {s.content}
                <div className="mt-4 flex gap-2">
                  <button className="px-3 py-2 bg-[#383F4C] text-white rounded hover:bg-[#2e3440]">
                    Download Checklist
                  </button>
                  <button className="px-3 py-2 border rounded">
                    Contact Support
                  </button>
                </div>
              </Collapsible>
            ))
          ) : (
            <p className="text-red-600 font-medium">
              ❌ No results found for "{query}". Try another keyword.
            </p>
          )}
        </div>

        <aside className="space-y-4">
          <div className="border rounded p-4 sticky top-6 bg-white">
            <h3 className="font-semibold mb-2">Quick Glossary</h3>
            <Glossary terms={glossary} />
          </div>

          <div className="border rounded p-4 bg-white">
            <h3 className="font-semibold mb-2">Useful Checklists</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Buying checklist (inspect, documents, offer)</li>
              <li>Rental move-in checklist (photos, meter readings)</li>
              <li>Selling checklist (staging, documents, valuation)</li>
            </ul>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 bg-[#383F4C] text-white rounded hover:bg-[#2e3440]">
                Download All PDFs
              </button>
              <button className="px-3 py-2 border rounded">Print Guide</button>
            </div>
          </div>

          <div className="border rounded p-4 bg-white">
            <h3 className="font-semibold mb-2">Need help?</h3>
            <p className="text-sm text-gray-700">
              If something is confusing, contact our support team or request a
              one-on-one consultation with an agent.
            </p>
            <div className="mt-3">
              <button className="px-3 py-2 bg-[#383F4C] text-white rounded w-full hover:bg-[#2e3440]">
                Contact Support
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p className="font-semibold mb-2">Terms written simply</p>
        <p>
          We explained legal, finance, and property words above in the quick
          glossary so you don't need to read confusing legal pages. If you want
          a fuller explanation, click any term and ask support for a breakdown in
          simple examples.
        </p>
      </div>
    </div>
  );
}

