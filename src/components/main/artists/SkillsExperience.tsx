interface Artist {
  name: string;
  profession: string;
  location: string;
  image: string;
  skills: string[];
  about: string;
  media: string[];
}

interface SkillsExperienceProps {
  artist: Artist;
}

const SkillsExperience: React.FC<SkillsExperienceProps> = ({ artist }) => {
  return (
    <div className="w-full max-w-full p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md">
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{artist.name}</h2>
        <p className="mt-1 text-sm sm:text-base text-gray-600">
          {artist.profession} • {artist.location}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Skills</h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {artist.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm sm:text-base text-gray-700 border border-gray-300"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillsExperience;
