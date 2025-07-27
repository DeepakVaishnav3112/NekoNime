import { Link } from "react-router-dom"
import { assets } from "../../utils/assets"

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10 mt-5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-secondary">
              Neko<span className="">Nime</span>
            </h2>
            <p className="mt-2 text-sm">Find Your Next Favorite Anime, nya~!</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2">Links</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-white">
                  Browse Anime
                </Link>
              </li>
              <li>
                <Link to="/user/watchlists" className="hover:text-white">
                  Watchlist
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm">
              NekoNime is a personal project built with ❤️ by Kuro-kun. Powered
              by AniList API.
            </p>
          </div>

          {/* Social/Contact */}
          <div>
            <h3 className="font-semibold mb-2">Connect</h3>
            <div className="flex space-x-4 mt-2">
              <a href="https://github.com/DeepakVaishnav3112" target="_blank">
                <img
                  src={assets.github_logo}
                  alt="github_logo"
                  className="w-5"
                />
              </a>
              <a href="www.linkedin.com/in/deepak-vaishnav-541199375" target="_blank">
                <img
                  src={assets.linkedin_logo}
                  alt="linkedin_logo"
                  className="w-5"
                />
              </a>
              {/* Add more if needed */}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-200">
          © 2025 NekoNime. Made with 💖 by Kuro-kun.
        </div>
      </footer>
  )
}
