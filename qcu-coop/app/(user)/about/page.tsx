import Image from "next/image";
const About = () => {
  return (
    <>
      <section className="h-user-main-mobile md:h-user-main max-md:mb-9 p-5 overflow-y-auto">
        <h1 className="font-bold text-xl mb-1 md:text-4xl"> About QCU Coop Store </h1>
        <hr className="border-2 border-black" />
        <p className="mt-5 indent-4 md:text-lg">
          Situated within the heart of the QCU Main - San Bartolome Campus, the
          Quezon City University Cooperative Store stands as a vital hub for the
          academic community. More than just a business, it operates with a
          mission to cater to the diverse needs of the university's dynamic
          student population. Managed by dedicated QCU staff, the cooperative
          store goes beyond the conventional retail model. It serves as a
          lifeline for students, providing not only essential school supplies
          and textbooks but also offering a curated selection of official
          uniforms and university-branded merchandise. From the practicalities
          of academic life to the pride associated with university identity, the
          store encompasses a comprehensive range of offerings. Among the
          distinctive items available are university-branded ID lanyards,
          symbolizing a sense of belonging and pride in being part of the Quezon
          City University community. Beyond its role as a low-profit business,
          the Cooperative Store becomes a central hub fostering a vibrant campus
          culture and supporting the academic journey of students at QCU.
        </p>
        <div className="mt-5">
          <h1 className="font-bold text-xl mb-1 md:text-4xl">About Us </h1>
          <hr className="border-2 border-black" />
          <div className=" w-full gap-5 mt-5 md:flex md:items-center">
            <div className="relative h-72 w-full md:h-96 overflow-hidden rounded-lg ">
              <Image
                src="/images/group-image3.jpg"
                alt="image"
                fill
                className="object-cover"
              />
            </div>

            <p className="indent-4 mt-3 md:w-3/4 md:text-xl">
              Introducing Group 4 of SBIT-2H A.Y 2023 from Quezon City
              University, a dynamic team of 2nd year BSIT students responsible
              for the groundbreaking Quezon City University Co-op Store
              Inventory and Sales Management System with a Mobile Application.
              This innovative system was conceived as part of their coursework
              for IS104 - Systems Analysis and Design. Under the guidance of Ms.
              Salvado, who served as the project manager, this group of 13
              talented individuals collaborated to build a system poised to
              revolutionize the former manual operations of the QCU Coop. The
              team comprised four skilled programmers (Villamora, Taladtad,
              Pelegre, Pineda), four creative designers (Riodil, Pena, Peralta,
              Ronquillo), and diligent Documentors and Researchers (Saligao,
              Pinuela, Malana, Cawile). Together, they successfully developed a
              system with the primary objective of automating inventory
              management and sales tracking. The ultimate goal is to eliminate
              the inefficiencies of the manual processes that were once integral
              to Coop operations, transitioning seamlessly to a digital
              platform. This shift not only signifies a technological leap but
              also promises to enhance customer service and overall operational
              efficiency for the Quezon City University Co-op Store.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
