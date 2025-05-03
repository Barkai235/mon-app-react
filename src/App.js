import { useState, useRef } from 'react';
import './App.css';

export default function App() {
  // État pour les informations du CV
  const [cvData] = useState({
    name: "MAHAMAT BARKAI MAIDE",
    title: "Étudiant en Informatique Professionnelle (ICT4D)",
    profileImage: "/barkai.jpg",
    contact: {
      email: "mahamatbarkai769@gmail.com",
      phone: "+237 6 58 77 59 91",
      location: "Yaoundé, Cameroun",
      birthDate: "14 février 2002",
      birthPlace: "Abéché, Tchad",
      nationality: "Tchadienne"
    },
    about: "Étudiant en 2ème année de licence en Informatique Professionnelle (ICT4D) à l'Université de Yaoundé 1, passionné par les technologies numériques. Compétent en programmation (C, HTML, CSS) et bureautique (Microsoft Office). Actif dans des projets associatifs, je cherche à contribuer et à développer mes compétences dans le domaine des technologies de l'information.",
    experience: [
      {
        id: 1,
        role: "Membre actif",
        company: "Association tchadienne à Yaoundé",
        period: "En cours",
        description: "Participation active aux activités associatives et aux projets communautaires."
      },
      {
        id: 2,
        role: "Projets universitaires",
        company: "Université de Yaoundé 1",
        period: "En cours",
        description: "Développement de projets dans le cadre du cursus universitaire en informatique."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Licence en Informatique Professionnelle (ICT4D)",
        institution: "Université de Yaoundé 1, Cameroun",
        period: "2023-2024",
        details: "Licence 1"
      },
      {
        id: 2,
        degree: "Baccalauréat Scientifique (Série D)",
        institution: "Lycée de Centre Koweït, N'Djamena, Tchad",
        period: "2022-2023",
        details: "Mention : Passable"
      },
      {
        id: 3,
        degree: "Brevet d'Études Fondamentales (BEF)",
        institution: "Collège de Goudji Charafa, N'Djamena, Tchad",
        period: "2019-2020"
      }
    ],
    skills: [
      { id: 1, name: "C", level: 75 },
      { id: 2, name: "HTML", level: 80 },
      { id: 3, name: "CSS", level: 70 },
      { id: 4, name: "Microsoft Office", level: 85 },
      { id: 5, name: "Travail en équipe", level: 90 },
      { id: 6, name: "Esprit d'analyse", level: 85 },
      { id: 7, name: "Organisation", level: 80 }
    ],
    languages: [
      { id: 1, name: "Français", level: "Courant" },
      { id: 2, name: "Arabe", level: "Courant" }
    ],
    interests: [
      { id: 1, name: "Lecture (développement personnel et technique)" },
      { id: 2, name: "Sports (football, basketball)" }
    ],
    // Chemins d'audio pour chaque section (à remplacer par vos propres fichiers audio)
    audio: {
      profile: "/audio/mht.mp3",
      contact: "/audio/contact.mp3",
      education: "/audio/education.mp3",
      experience: "/audio/experience.mp3",
      skills: "/audio/skills.mp3",
      languages: "/audio/languages.mp3",
      interests: "/audio/interests.mp3"
    },
    // Chemins vidéo pour chaque section (à remplacer par vos propres fichiers vidéo)
    video: {
      profile: "/video/profile.mp4",
      contact: "/video/contact.mp4",
      education: "/video/education.mp4",
      experience: "/video/experience.mp4",
      skills: "/video/skills.mp4",
      languages: "/video/languages.mp4",
      interests: "/video/interests.mp4"
    }
  });

  // État pour le thème
  const [darkMode, setDarkMode] = useState(false);
  
  // État pour la fenêtre modale vidéo
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoSrc: ""
  });

  // Références pour les éléments audio
  const audioRefs = {
    profile: useRef(null),
    contact: useRef(null),
    education: useRef(null),
    experience: useRef(null),
    skills: useRef(null),
    languages: useRef(null),
    interests: useRef(null)
  };

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Fonction pour jouer l'audio
  const playAudio = (section) => {
    // Arrêter tous les autres audios d'abord
    Object.keys(audioRefs).forEach(key => {
      if (audioRefs[key].current) {
        audioRefs[key].current.pause();
        audioRefs[key].current.currentTime = 0;
      }
    });

    // Jouer l'audio de la section sélectionnée
    if (audioRefs[section].current) {
      audioRefs[section].current.play();
    }
  };

  // Fonction pour ouvrir la fenêtre modale vidéo
  const openVideoModal = (section) => {
    setVideoModal({
      isOpen: true,
      videoSrc: cvData.video[section]
    });
  };

  // Fonction pour fermer la fenêtre modale vidéo
  const closeVideoModal = () => {
    setVideoModal({
      ...videoModal,
      isOpen: false
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Éléments audio cachés */}
      {Object.keys(audioRefs).map(key => (
        <audio 
          key={key} 
          ref={audioRefs[key]} 
          src={cvData.audio[key]} 
          preload="auto"
        />
      ))}

      {/* Fenêtre modale vidéo */}
      {videoModal.isOpen && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideoModal}>×</button>
            <video 
              src={videoModal.videoSrc} 
              controls 
              autoPlay 
              className="video-player"
            ></video>
          </div>
        </div>
      )}

      {/* Header avec bouton de thème et photo de profil */}
      <header className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="flex justify-end mb-4">
          <button 
            onClick={toggleTheme} 
            className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
          </button>
        </div>
        
        <div className="flex flex-col items-center text-center">
          {/* Photo de profil */}
          <div className="mb-4">
            <img 
              src={cvData.profileImage} 
              alt="Photo de profil" 
              className="rounded-full w-40 h-40 object-cover border-4 border-blue-500 shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{cvData.name}</h1>
            <h2 className="text-xl text-gray-500 mt-1">{cvData.title}</h2>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto p-6 max-w-4xl">
        {/* Section Profil */}
        <section className={`p-6 mb-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold border-b pb-2">Profil</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => playAudio('profile')} 
                className="audio-btn"
                aria-label="Écouter la présentation du profil"
              >
                🎙️
              </button>
              <button 
                onClick={() => openVideoModal('profile')} 
                className="video-btn"
                aria-label="Regarder la vidéo du profil"
              >
                🎬
              </button>
            </div>
          </div>
          <p>{cvData.about}</p>
        </section>

        {/* Section Contact et Informations Personnelles */}
        <section className={`p-6 mb-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold border-b pb-2">Informations Personnelles</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => playAudio('contact')} 
                className="audio-btn"
                aria-label="Écouter les informations personnelles"
              >
                🎙️
              </button>
              <button 
                onClick={() => openVideoModal('contact')} 
                className="video-btn"
                aria-label="Regarder la vidéo des informations personnelles"
              >
                🎬
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <p><span className="font-semibold">Email:</span> {cvData.contact.email}</p>
            <p><span className="font-semibold">Téléphone:</span> {cvData.contact.phone}</p>
            <p><span className="font-semibold">Localisation:</span> {cvData.contact.location}</p>
            <p><span className="font-semibold">Date de naissance:</span> {cvData.contact.birthDate}</p>
            <p><span className="font-semibold">Lieu de naissance:</span> {cvData.contact.birthPlace}</p>
            <p><span className="font-semibold">Nationalité:</span> {cvData.contact.nationality}</p>
          </div>
        </section>

        {/* Section Formation */}
        <section className={`p-6 mb-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold border-b pb-2">Formation</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => playAudio('education')} 
                className="audio-btn"
                aria-label="Écouter la formation"
              >
                🎙️
              </button>
              <button 
                onClick={() => openVideoModal('education')} 
                className="video-btn"
                aria-label="Regarder la vidéo de formation"
              >
                🎬
              </button>
            </div>
          </div>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className="font-semibold text-lg">{edu.degree}</h3>
              <p className="italic text-gray-500">{edu.institution} | {edu.period}</p>
              {edu.details && <p className="mt-1">{edu.details}</p>}
            </div>
          ))}
        </section>

        {/* Section Expériences et Projets */}
        <section className={`p-6 mb-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold border-b pb-2">Expériences et Projets</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => playAudio('experience')} 
                className="audio-btn"
                aria-label="Écouter les expériences"
              >
                🎙️
              </button>
              <button 
                onClick={() => openVideoModal('experience')} 
                className="video-btn"
                aria-label="Regarder la vidéo des expériences"
              >
                🎬
              </button>
            </div>
          </div>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="font-semibold text-lg">{exp.role}</h3>
              <p className="italic text-gray-500">{exp.company} | {exp.period}</p>
              <p className="my-2">{exp.description}</p>
            </div>
          ))}
        </section>

        {/* Section Compétences */}
        <section className={`p-6 mb-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold border-b pb-2">Compétences</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => playAudio('skills')} 
                className="audio-btn"
                aria-label="Écouter les compétences"
              >
                🎙️
              </button>
              <button 
                onClick={() => openVideoModal('skills')} 
                className="video-btn"
                aria-label="Regarder la vidéo des compétences"
              >
                🎬
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {cvData.skills.map((skill) => (
              <div key={skill.id} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className="h-full rounded-full bg-blue-500" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Langues */}
        <section className={`p-6 mb-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold border-b pb-2">Langues</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => playAudio('languages')} 
                className="audio-btn"
                aria-label="Écouter les langues"
              >
                🎙️
              </button>
              <button 
                onClick={() => openVideoModal('languages')} 
                className="video-btn"
                aria-label="Regarder la vidéo des langues"
              >
                🎬
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {cvData.languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-2">
                <span className="font-medium">{lang.name}:</span>
                <span className="text-gray-500">{lang.level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section Loisirs */}
        <section className={`p-6 mb-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold border-b pb-2">Loisirs</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => playAudio('interests')} 
                className="audio-btn"
                aria-label="Écouter les loisirs"
              >
                🎙️
              </button>
              <button 
                onClick={() => openVideoModal('interests')} 
                className="video-btn"
                aria-label="Regarder la vidéo des loisirs"
              >
                🎬
              </button>
            </div>
          </div>
          <ul className="list-disc pl-5">
            {cvData.interests.map((interest) => (
              <li key={interest.id} className="mb-1">{interest.name}</li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className={`p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-inner`}>
        <p>© {new Date().getFullYear()} {cvData.name} - CV React App</p>
      </footer>
    </div>
  );
}