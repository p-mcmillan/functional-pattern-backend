/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('reviews').del();
  await knex('reviews').insert([
    {
      id: 'f1aaf9cb-44a1-4bb4-9c65-185fb7b9a123',
      contact_name: 'Parmin Aujla',
      contact_email: 'paujla@instock.com',
      rating: '1',
      review:
        'Ang Lorem Ipsum ay ginagamit na modelo ng industi. Sums nhing software  Pagemaker ginamit ang mga bersyon ng Lorem Ipsum.',
    },
    {
      id: '3e5fe4e7-8779-42d8-b380-68f0a07e9a8c',
      contact_name: 'Greame Lyon',
      contact_email: 'glyon@instock.com',
      rating: '5',
      review:
        'Lorem Ipsum is simply dummy text of the printing and typesetthen an unknown printer took a g',
    },
    {
      id: '8a9fd2d2-8f85-45b8-aa2c-9585286fdcf2',
      contact_name: 'Brad MacDonald',
      contact_email: 'bmcdonald@instock.com',
      rating: '3',
      review:
        'Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության համար նախատեաբերության ստանդարտ մոդելային տեքստ, ինչը մ',
    },
  ]);
};
