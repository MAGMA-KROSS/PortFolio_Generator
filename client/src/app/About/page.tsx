// app/about/page.tsx

import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import Image from 'next/image';

// Define an interface for the team member data
interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Kumar Abi',
    role: 'Frontend Developer',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQGzYJN3NhKF0w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1732960568626?e=1762387200&v=beta&t=5R16AgG441LONQnUtpY94TzwtpHvsnYVBZ-jh2iNqzo', // Replace with actual image path
  },
  {
    name: 'Muhammad Imad',
    role: 'Backend Developer',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQF5YeFVU2rj_Q/profile-displayphoto-scale_400_400/B56Zj2XIFUHIAo-/0/1756479916412?e=1762387200&v=beta&t=p5-y_seBRR28xobt4BwaCIFJ3hQRwRHeJbv9BggMkDU', // Replace with actual image path
  },
  
];

const AboutUsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className=" px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Magma</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              We&apos;re passionate about empowering individuals to create stunning online portfolios with ease.
            </p>
          </div>

          {/* Our Mission */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-300">
              Our mission is to provide developers, designers, and creatives with the tools they need to build a professional online presence. We believe that everyone deserves a beautiful portfolio to showcase their work, and we&apos;re here to make that a reality.
            </p>
          </div>

          {/* Our Story */}
          <div className="mt-16">
            <h2 className="text-center text-3xl font-semibold">Our Story</h2>
            <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col justify-center">
                <p className="text-lg text-slate-300">
                  Founded in 2025, Magma started as a small project between two friends who were frustrated with the complexity of building and maintaining a portfolio. What began as a simple template has now grown into a platform that helps thousands of professionals around the world.
                </p>
                <p className="mt-4 text-lg text-slate-300">
                  We&apos;re constantly innovating and adding new templates and features to make Magma the best portfolio-building experience on the web.
                </p>
              </div>
              <div className="flex items-center justify-center">
                {/* Replace with an image of your team or office */}
                <Image
                  src="https://media.licdn.com/dms/image/v2/D4D22AQFTwEiyyvM55Q/feedshare-shrink_2048_1536/B4DZPFgF7uG0Ao-/0/1734185346177?e=1762387200&v=beta&t=8sRBk8L7QeWGbZ7mbyj5Oa75TEEQ7J_W5AxMduLFtMc"
                  alt="Our Team"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Meet the Team */}
          <div className="mt-20">
            <h2 className="text-center text-3xl font-semibold">Meet the Team</h2>
            <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <Image
                    className="mx-auto h-32 w-32 rounded-full"
                    src={member.imageUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                  />
                  <h3 className="mt-4 text-xl font-medium">{member.name}</h3>
                  <p className="text-slate-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AboutUsPage;