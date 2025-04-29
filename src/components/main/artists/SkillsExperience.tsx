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
    <div>
      <h2>{artist.name}</h2>
      <ul>
        {artist.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsExperience;
