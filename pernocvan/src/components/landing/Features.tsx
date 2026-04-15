import React from 'react';

// Un array con los datos para que sea muy fácil añadir o quitar características luego
const features = [
  {
    title: 'Mapa Interactivo',
    description: 'Encuentra puntos de pernocta, áreas de servicio y parkings en tiempo real en cualquier parte.',
    icon: '📍',
  },
  {
    title: 'Comunidad Activa',
    description: 'Lee opiniones actualizadas sobre la seguridad y los servicios de cada lugar gracias a otros viajeros.',
    icon: '👥',
  },
  {
    title: 'Guarda tus Rutas',
    description: 'Añade lugares a tus favoritos y organiza tus próximos viajes en furgoneta sin perder detalle.',
    icon: '⭐',
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título de la sección */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Todo lo que necesitas para tu viaje
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Pernocvan está diseñado para hacer tu vida camper mucho más fácil, segura y conectada.
          </p>
        </div>

        {/* Tarjetas de características */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-2xl px-6 pb-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-gray-100 transform hover:-translate-y-1">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-4 bg-green-600 rounded-xl shadow-lg text-3xl">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-bold text-gray-900 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};