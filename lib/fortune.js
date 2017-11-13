/*jshint esversion: 6 */

const fortuneCookies = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs",
    "Do not fear what you don't know",
    "You will have a pleasant surprise.",
    "Whnever possible, keep it sinple."
];

exports.getFortune = () => {
    let idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};