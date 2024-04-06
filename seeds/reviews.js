/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("reviews").del();
  await knex("reviews").insert([
    {
      id: 1,
      contact_name: "Parmin Aujla",
      contact_email: "paujla@instock.com",
      rating: "1",
      review:
        "Ang Lorem Ipsum ay ginagamit na modelo ng industi. Sums nhing software  Pagemaker ginamit ang mga bersyon ng Lorem Ipsum.",
    },
    {
      id: 2,
      contact_name: "Greame Lyon",
      contact_email: "glyon@instock.com",
      rating: "5",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetthen an unknown printer took a g",
    },
    {
      id: 3,
      contact_name: "Brad MacDonald",
      contact_email: "bmcdonald@instock.com",
      rating: "3",
      review:
        "Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության համար նախատեաբերության ստանդարտ մոդելային տեքստ, ինչը մ",
    },
  ]);
};
