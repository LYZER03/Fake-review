import Image from "next/image";
import Link from 'next/link'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="NickLittleRobocalling.gif" alt='' className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Remove the fake!</h1>
            <p className="text-xl py-6">Discover our revolutionary fake review detection solution: the key to total transparency and greater confidence in your online reviews.</p>
            <button className="btn btn-neutral">
              <Link href="/Detect">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total reviews analyzed</div>
          <div className="stat-value">2 985 212</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Already</div>
          <div className="stat-value">60K users</div>
          <div className="stat-desc">10% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">- - -</div>
          <div className="stat-value">- - -</div>
          <div className="stat-desc">- - - </div>
        </div>
      </div>
      
    </main>
  );
}
