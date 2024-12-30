import { Injectable } from '@nestjs/common';
import axios from 'axios';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    //#region google search engine
    // const extractContactDetails = (snippet) => {
    //   const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g;
    //   const phoneRegex =
    //     /\+?[0-9]{1,4}?[-.\s]?([0-9]{2,3}[-.\s]?){2,3}[0-9]{2,4}/g;
    //   const emails = snippet.match(emailRegex) || [];
    //   const phones = snippet.match(phoneRegex) || [];
    //   return { emails, phones };
    // };
    // // Example usage
    // const resultSnippet =
    //   'Contact us at support@example.com or call us on +123-456-7890 for more info.';
    // const contacts = extractContactDetails(resultSnippet);
    // console.log(contacts); // { emails: ['support@example.com'], phones: ['+123-456-7890'] }
    // // Example usage
    // return await this.searchGoogle('Oriental School').then(
    //   (results) => {
    //     console.log('Search Results:', results);
    //   },
    // );
    //#endregion

    //#region puppeteer
    await this.scrapeLeads('School Timetable Generator')
      .then((leads) => console.log("leads :", leads))
      .catch((err) => console.error(err));
    //#endregion
  }

  async searchGoogle(query: string) {
    const apiKey = 'AIzaSyD-BiKTfDmQte1entC1ukkVkvnG3K45hOs'; // Replace with your API key
    const cx = '0461503a5809943ef'; // Replace with your Custom Search Engine ID
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query,
    )}&key=${apiKey}&cx=${cx}`;

    try {
      const response = await axios.get(url);
      // console.log("response ::", response)
      return response.data.items.map((item) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
      }));
    } catch (error) {
      console.error('Error with Google Custom Search API:', error);
      return [];
    }
  }

  async scrapeLeads(keyword) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${keyword}`);

    const leads = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.some-selector')).map(
        (el) => ({
          name: el.querySelector('.name-selector').textContent,
          link: el.querySelector('a').href,
        }),
      );
    });

    await browser.close();
    return leads;
  }
}
