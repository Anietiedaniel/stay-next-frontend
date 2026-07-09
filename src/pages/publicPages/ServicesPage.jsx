// import React, { useState } from 'react';
// import PageHeader from '../../sections/Servicesections/PageHeader';
// // import WorkersSection from '../../sections/Servicesections/workersSection';
// // import WorkShowcase from '../../sections/Servicesections/WorkShowcase';
// // import '../../styles/globalStyles.css';

// // const allWorkers = [
// //   {
// //     id: 1,
// //     name: 'John Doe',
// //     profession: 'Bricklayer',
// //     experience: 5,
// //     location: 'Lagos',
// //     image: 'https://randomuser.me/api/portraits/men/12.jpg',
// //     whatsapp: '+2347012345678',
// //   },
// //   {
// //     id: 2,
// //     name: 'Grace Smith',
// //     profession: 'Plumber',
// //     experience: 4,
// //     location: 'Abuja',
// //     image: 'https://randomuser.me/api/portraits/women/22.jpg',
// //     whatsapp: '+2348098765432',
// //   },
// //   {
// //     id: 3,
// //     name: 'Samuel Kelvin',
// //     profession: 'Electrician',
// //     experience: 7,
// //     location: 'Port Harcourt',
// //     image: 'https://randomuser.me/api/portraits/men/36.jpg',
// //     whatsapp: '+2348034567890',
// //   },
// //   {
// //     id: 4,
// //     name: 'Jane Williams',
// //     profession: 'Architect',
// //     experience: 10,
// //     location: 'Lagos',
// //     image: 'https://randomuser.me/api/portraits/women/55.jpg',
// //     whatsapp: '+2348023456789',
// //   },
// // ];

// const ServicesPage = () => {
// //   const [selectedProfession, setSelectedProfession] = useState('All');

// //   const filteredWorkers =
// //     selectedProfession === 'All'
// //       ? allWorkers
// //       : allWorkers.filter((w) => w.profession === selectedProfession);

//   return (
//     <div className="px-3">
//       <PageHeader />
//       {/* <WorkersSection />
//       <WorkShowcase/> */}
//       {/* <h2>Service provider Coming soon...</h2> */}
//     </div>
    
//   );
// };

// export default ServicesPage;

import React, { useState, useMemo } from 'react';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('professionals');
  const [roleFilter, setRoleFilter] = useState('All');
  const [query, setQuery] = useState('');

  const data = {
    professionals: {
      title: "Licensed Professionals",
      color: "green",
      items: [
        { title: "Civil Engineer", icon: "fa-solid fa-hard-hat", desc: "Structural integrity and safety compliance." },
        { title: "Architect", icon: "fa-solid fa-compass-drafting", desc: "Innovative building design and 3D modeling." },
        { title: "Surveyor", icon: "fa-solid fa-map-location-dot", desc: "Precise land measurement and boundary assessment." },
        { title: "Project Manager", icon: "fa-solid fa-list-check", desc: "End-to-end oversight and timeline management." },
        { title: "Real Estate Attorney", icon: "fa-solid fa-gavel", desc: "Legal documentation and property rights." },
        { title: "Interior Designer", icon: "fa-solid fa-couch", desc: "Custom space planning and aesthetic solutions." }
      ]
    },
    artisans: {
      title: "Expert Artisans",
      color: "purple",
      items: [
        { title: "Plumber", icon: "fa-solid fa-faucet-drip", desc: "Pipeline installation and leak solutions." },
        { title: "Electrician", icon: "fa-solid fa-bolt", desc: "Certified wiring and lighting installation." },
        { title: "Carpenter", icon: "fa-solid fa-hammer", desc: "Precision woodwork, cabinetry, and joinery." },
        { title: "Mason/Bricklayer", icon: "fa-solid fa-trowel-bricks", desc: "Quality block work and concrete structures." },
        { title: "HVAC Technician", icon: "fa-solid fa-snowflake", desc: "Cooling and air ventilation maintenance." },
        { title: "Painter", icon: "fa-solid fa-brush", desc: "Professional coating and wall finishing." }
      ]
    }
  };

  // People directory, keyed by role title
  const people = {
    "Civil Engineer": [
      { name: "Tamuno Okoye", exp: 9, rating: 4.8, reviews: 62, rate: "₦45,000/day", initials: "TO" },
      { name: "Ifeanyi Chukwu", exp: 6, rating: 4.6, reviews: 34, rate: "₦38,000/day", initials: "IC" }
    ],
    "Architect": [
      { name: "Amaka Nwosu", exp: 11, rating: 4.9, reviews: 88, rate: "₦60,000/day", initials: "AN" },
      { name: "David Effiong", exp: 7, rating: 4.7, reviews: 45, rate: "₦50,000/day", initials: "DE" }
    ],
    "Surveyor": [
      { name: "Preye Amadi", exp: 8, rating: 4.5, reviews: 29, rate: "₦35,000/day", initials: "PA" },
      { name: "Chidi Eze", exp: 5, rating: 4.4, reviews: 21, rate: "₦30,000/day", initials: "CE" }
    ],
    "Project Manager": [
      { name: "Boma Wariboko", exp: 10, rating: 4.8, reviews: 57, rate: "₦55,000/day", initials: "BW" },
      { name: "Segun Adeyemi", exp: 6, rating: 4.6, reviews: 33, rate: "₦42,000/day", initials: "SA" }
    ],
    "Real Estate Attorney": [
      { name: "Barr. Ngozi Umeh", exp: 13, rating: 4.9, reviews: 71, rate: "₦70,000/session", initials: "NU" },
      { name: "Barr. Kelechi Obi", exp: 8, rating: 4.7, reviews: 40, rate: "₦55,000/session", initials: "KO" }
    ],
    "Interior Designer": [
      { name: "Zainab Bello", exp: 7, rating: 4.8, reviews: 49, rate: "₦40,000/day", initials: "ZB" },
      { name: "Emeka Nnamdi", exp: 5, rating: 4.5, reviews: 26, rate: "₦32,000/day", initials: "EN" }
    ],
    "Plumber": [
      { name: "Godwin Etim", exp: 12, rating: 4.7, reviews: 90, rate: "₦15,000/day", initials: "GE" },
      { name: "Musa Danladi", exp: 6, rating: 4.5, reviews: 38, rate: "₦12,000/day", initials: "MD" }
    ],
    "Electrician": [
      { name: "Chukwuemeka Obasi", exp: 10, rating: 4.8, reviews: 102, rate: "₦18,000/day", initials: "CO" },
      { name: "Sunday Ibrahim", exp: 7, rating: 4.6, reviews: 55, rate: "₦14,000/day", initials: "SI" }
    ],
    "Carpenter": [
      { name: "Ebiere Sotonye", exp: 9, rating: 4.7, reviews: 61, rate: "₦16,000/day", initials: "ES" },
      { name: "Yusuf Garba", exp: 5, rating: 4.4, reviews: 22, rate: "₦12,500/day", initials: "YG" }
    ],
    "Mason/Bricklayer": [
      { name: "Friday Osaro", exp: 14, rating: 4.8, reviews: 77, rate: "₦17,000/day", initials: "FO" },
      { name: "Abubakar Sani", exp: 8, rating: 4.5, reviews: 41, rate: "₦13,000/day", initials: "AS" }
    ],
    "HVAC Technician": [
      { name: "Victor Etuk", exp: 8, rating: 4.6, reviews: 35, rate: "₦20,000/day", initials: "VE" },
      { name: "Ibrahim Yakubu", exp: 6, rating: 4.4, reviews: 24, rate: "₦17,000/day", initials: "IY" }
    ],
    "Painter": [
      { name: "Blessing Nkem", exp: 6, rating: 4.6, reviews: 30, rate: "₦11,000/day", initials: "BN" },
      { name: "Rasheed Lawal", exp: 4, rating: 4.3, reviews: 15, rate: "₦9,000/day", initials: "RL" }
    ]
  };

  // Muted, near-neutral theme: deep sage green + near-black plum purple
  const theme = {
    green: {
      tabActive: 'bg-green-300 border-stone-800',
      chipActive: 'bg-stone-800 border-stone-800 text-white',
      iconBg: 'bg-stone-100',
      iconText: 'text-emerald-800',
      link: 'text-emerald-800 hover:text-emerald-900',
      cardBorderActive: 'border-emerald-800'
    },
    purple: {
      tabActive: 'bg-green-400 border-stone-900',
      chipActive: 'bg-stone-900 border-stone-900 text-white',
      iconBg: 'bg-stone-100',
      iconText: 'text-purple-950',
      link: 'text-purple-950 hover:text-black',
      cardBorderActive: 'border-purple-950'
    }
  };

  const roles = data[activeTab].items.map(i => i.title);

  const filteredPeople = useMemo(() => {
    const q = query.trim().toLowerCase();
    const targetRoles = roleFilter === 'All' ? roles : [roleFilter];
    const result = [];
    targetRoles.forEach(role => {
      (people[role] || []).forEach(p => {
        if (!q || p.name.toLowerCase().includes(q) || role.toLowerCase().includes(q)) {
          result.push({ ...p, role });
        }
      });
    });
    return result;
  }, [activeTab, roleFilter, query]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setRoleFilter('All');
    setQuery('');
  };

  const color = data[activeTab].color;
  const t = theme[color];

  return (
    <div className="bg-gray-200 py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Toggle Tabs */}
        <div className="flex justify-center gap-6 mb-16">
          {Object.keys(data).map((key) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`px-10 py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeTab === key
                ? `${theme[data[key].color].tabActive} text-white shadow-md`
                : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* People directory */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Meet Our {data[activeTab].title}
            </h2>
            <div className="relative w-full md:w-80">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or role..."
                className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 shadow-sm"
              />
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => setRoleFilter('All')}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide border transition ${
                roleFilter === 'All'
                ? t.chipActive
                : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'
              }`}
            >
              All
            </button>
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide border transition ${
                  roleFilter === role
                  ? t.chipActive
                  : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* People grid */}
          {filteredPeople.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              No one matches that search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeople.map((p, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full ${t.iconBg} flex items-center justify-center text-sm font-bold ${t.iconText}`}>
                      {p.initials}
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold text-sm">{p.name}</h4>
                      <p className="text-gray-400 text-xs">{p.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-star text-yellow-500"></i>
                      {p.rating} ({p.reviews})
                    </span>
                    <span>{p.exp} yrs exp</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="text-gray-900 font-semibold text-sm">{p.rate}</span>
                    <button className={`text-xs font-bold ${t.link} flex items-center gap-1 transition`}>
                      Book <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}