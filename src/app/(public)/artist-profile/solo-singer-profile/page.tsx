"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Reviews from "@/components/main/artists/Reviews";
import ArtistCard from "@/components/ui/ArtistCard";
import { artists, servicesData } from "@/components/main/data";
import ServiceCard from "@/components/ui/ServiceCard";

const thumbnailImages = [
  "/images/solo-singer2.png",
  "/images/solo-singer3.png",
  "/images/solo-singer4.png",
  "/images/solo-singer5.png",
  "/images/solo-singer6.png",
  "/images/solo-singer7.png"
];

const SoloSingerProfile = () => {
  // const t = useTranslations("HomePage");

  return (
    <section className="flex flex-row p-4">
      {/* Left side */}
      <div className="mx-auto w-[70%] max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/search-results" className="text-gray-600 hover:text-gray-900">
            Search Results
          </Link>
          <span>/</span>
          <span className="text-gray-900">Solo Singers</span>
        </div>

        {/* Title and Rating Section */}
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold">Providing Multiple Services for Companies - Easy</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Image
                src="/images/ArtistsServicesImg.png"
                alt="Domenica"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2">Domenica</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1">4.5</span>
              <span className="ml-1 text-gray-500">(450 reviews)</span>
            </div>
          </div>
        </div>

        {/* Main Image Section */}
        <div className="mb-6">
          <Image
            src="/images/solo-singer1.png"
            alt="Main image"
            width={800}
            height={450}
            className="aspect-video w-full rounded-lg object-cover"
          />
        </div>

        {/* Thumbnail Preview Section */}
        <div className="grid grid-cols-6 gap-4">
          {thumbnailImages.map((imagePath, index) => (
            <div key={index} className="aspect-video cursor-pointer overflow-hidden rounded-lg shadow-sm">
              <Image
                src={imagePath}
                alt={`Thumbnail ${index + 1}`}
                width={160}
                height={90}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* About Service Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">About Service</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Dignissim enim sit amet venenatis urna cursus eget nunc. Mauris ultrices eros in cursus
            turpis massa tincidunt dui ut. Nibh praesent tristique magna sit amet. Dolor sit amet consectetur
            adipiscing. Duis at consectetur lorem donec massa sapien. Aliquam etiam erat velit scelerisque. Diam ut
            venenatis tellus in metus vulputate eu scelerisque felis. Proin sed libero enim sed faucibus. Ultrices
            gravida dictum fusce ut placerat orci nulla. Volutpat blandit aliquam etiam erat velit scelerisque in
            dictum. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Egestas integer eget aliquet nibh praesent
            tristique magna sit amet. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor.
            Facilisi etiam dignissim diam quis enim lobortis scelerisque. Sit amet luctus venenatis lectus magna
            fringilla. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Semper quis lectus
            nulla at volutpat diam ut venenatis tellus. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum
            consequat. Mi ipsum faucibus vitae aliquet nec ullamcorper.{" "}
          </p>
        </div>
        <div className="mt-8 flex flex-col">
          <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
          <Reviews />

          {/* Related Artists Section */}
          <div className="mt-10 rounded-xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Related Artists</h2>
              <button className="text-gray-600 hover:text-gray-900">Show All</button>
            </div>
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {artists.slice(0, 4).map((artist) => (
                <div key={artist.id} className="flex justify-center">
                  <ArtistCard {...artist} id={String(artist.id)} />
                </div>
              ))}
            </section>
          </div>

          {/* Top Services Section */}
          <div className="mt-10 rounded-xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Top Services</h2>
              <button className="text-gray-600 hover:text-gray-900">Show All</button>
            </div>
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {servicesData.slice(0, 4).map((service) => (
                <div key={service.id} className="flex justify-center">
                  <ServiceCard
                    service={{
                      _id: String(service.id),
                      artist_id: "default-artist-id", // fallback if not present
                      title: service.name,
                      category: "default-category",
                      subcategory: "default-subcategory",
                      searchTags: [],
                      description: "",
                      media: {
                        photos: [],
                        videos: [],
                        _id: ""
                      },
                      status: "active",
                      orders: [],
                      reviews: [],
                      pricing: {
                        starter: {
                          name: "Starter Plan",
                          description: "Basic service package",
                          price: Number(service.price),
                          _id: "starter-plan-id"
                        },
                        standard: {
                          name: "Standard Plan",
                          description: "Standard service package",
                          price: Number(service.price) + 50,
                          _id: "standard-plan-id"
                        },
                        advance: {
                          name: "Advance Plan",
                          description: "Premium service package",
                          price: Number(service.price) + 100,
                          _id: "advance-plan-id"
                        }
                      },
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      __v: 0
                    }}
                  />
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="sticky top-4 m-10 h-fit w-[30%] rounded-lg bg-gray-100 p-6 shadow-lg">
        {/* Service Package Selection */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Select Service Package</h2>
            <button className="text-sm text-red-500 hover:text-red-600">Compare Package</button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 text-center hover:border-gray-400">
              <div className="mx-auto mb-2 h-5 w-5 rounded-full border-2 border-gray-400"></div>
              <div className="text-sm text-gray-600">Starter</div>
              <div className="font-semibold">$100</div>
            </div>
            <div className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 text-center hover:border-gray-400">
              <div className="mx-auto mb-2 h-5 w-5 rounded-full border-2 border-gray-400"></div>
              <div className="text-sm text-gray-600">Standard</div>
              <div className="font-semibold">$200</div>
            </div>
            <div className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 text-center hover:border-gray-400">
              <div className="mx-auto mb-2 h-5 w-5 rounded-full border-2 border-gray-400"></div>
              <div className="text-sm text-gray-600">Advanced</div>
              <div className="font-semibold">$300</div>
            </div>
          </div>
        </div>

        {/* Service Description */}
        <div className="mb-6">
          <h3 className="mb-1 text-base font-semibold">Providing Multiple Services</h3>
          <p className="mb-3 text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 6v6l4 2" strokeWidth="2" />
              </svg>
              <span className="text-sm text-gray-600">Deliver Time</span>
            </div>
            <span className="text-sm font-semibold">10 Days</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="mb-6 text-center">
          <Image
            src="/images/ArtistsServicesImg.png"
            alt="Profile"
            width={60}
            height={60}
            className="mx-auto mb-2 rounded-full"
          />
          <div className="mb-1 flex items-center justify-center gap-1">
            <h4 className="text-sm font-semibold">Domenica</h4>
            <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">Last seen 1hr ago • 09:38 PM</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex gap-3">
          <button className="flex-1 rounded-full bg-pink-50 px-4 py-2.5 text-sm text-red-500 hover:bg-pink-100">
            Message
          </button>
          <button className="flex-1 rounded-full bg-gradient-to-r from-red-400 to-red-500 px-4 py-2.5 text-sm text-white hover:from-red-500 hover:to-red-600">
            Confirm
          </button>
        </div>

        {/* Share Section */}
        <div>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-sm text-gray-600">Share:</span>
            <div className="flex gap-2">
              <button className="rounded-full p-1.5 hover:bg-gray-100">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                </svg>
              </button>
              <button className="rounded-full p-1.5 hover:bg-gray-100">
                <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="rounded-full p-1.5 hover:bg-gray-100">
                <svg className="h-4 w-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </button>
              <button className="rounded-full p-1.5 hover:bg-gray-100">
                <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Report Account Link */}
          <button className="flex w-full items-center justify-center gap-2 text-center text-sm text-gray-600 hover:text-gray-800">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
            Report the account
          </button>
        </div>
      </div>
    </section>
  );
};

export default SoloSingerProfile;
