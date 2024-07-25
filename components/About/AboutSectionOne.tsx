import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28 text-justify">
      <div className="container">
        {/* <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2"> */}
              <SectionTitle
                title="Background and Experinece."
                paragraph="The AFSB is a recently registered organization that started its activities in 2019 as an initiative group. In 2018 our initiative the group, participated in the activities implemented by the FSL in the frame of the “No Hate Speech” campaign of the Council of Europe. For our initiative group, participating in the campaign was a turning moment. It helped us realize that we needed to protect human rights, the environment, and peaceful coexistence and that we could do much more to contribute back to society. To find common ground and create bridges between cultures, the initiative group of the AFSB organization started hosting workshops on intercultural learning where representatives of various cultural, linguistic, national, and religious communities in Spain presented the distinctive features of their cultures. Due to the overwhelming success of the workshops, the group opened a branch in Barcelona with the help of the network. A methodological toolbox has been produced by the AFSB, which is made up of youth workers, civic education instructors, and trainers of intercultural learning. Exercises, handouts, presentations, simulations, role plays, and other resources are included in this toolbox for use in intercultural, interreligious, and other events. Even before the AFSB was officially registered, its members participated in the planning of numerous intercultural events in Armenia, Germany, and Luxembourg. The association team also helped organize a few Erasmus+ youth programs hosted by FSNetwork. The AFSB is dedicated to advancing civic education and intercultural learning, and it is constantly refining its strategies and tactics to do so. "
                mb="80px"
              />
              <SectionTitle
              
                paragraph="Although AFSB is a recently recognized organization, we have prior experience working with young people in an informal setting. We planned various youth work activities, such as workshops, seminars, and cultural gatherings. Our team has considerable experience and is skilled in young leadership, community involvement, and cross-cultural communication. Our team consists of experts with the necessary training and credentials, and we are dedicated to offering high-quality youth work programs that satisfy the needs of young people. As a newly registered organization, we understand the importance of being part of a broader network of experienced organizations. We have joined the FSNetwork, which provides access to a community of like-minded organizations and professionals. This network offers valuable resources and collaboration opportunities, helping us strengthen our capacity to deliver effective youth work activities. Through our membership in the FSNetwork, we have gained valuable insights and best practices from professional organizations. We have been able to learn from the experiences of others and share our expertise, contributing to a culture of continuous learning and improvement. Being part of a professional network has also helped us to develop new partnerships and collaborations, expanding our reach and impact in the community. "
                mb="80px"
              />

              {/* <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Premium quality" />
                    <List text="Tailwind CSS" />
                    <List text="Use for lifetime" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Next.js" />
                    <List text="Rich documentation" />
                    <List text="Developer friendly" />
                  </div>
                </div>
              </div> */}
            </div>

            {/* <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <Image
                  src="/images/about/about-image.svg"
                  alt="about-image"
                  fill
                  className="drop-shadow-three mx-auto max-w-full dark:hidden dark:drop-shadow-none lg:mr-0"
                />
                <Image
                  src="/images/about/about-image-dark.svg"
                  alt="about-image"
                  fill
                  className="drop-shadow-three mx-auto hidden max-w-full dark:block dark:drop-shadow-none lg:mr-0"
                />
              </div>
            </div> */}
          {/* </div>
        </div>
      </div> */}
    </section>
  );
};

export default AboutSectionOne;
