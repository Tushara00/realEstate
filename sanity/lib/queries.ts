import {defineQuery} from 'next-sanity';

export const footerQuery = defineQuery(`
  *[_type == "footer"][1]{
 
    links[]{
      label,
      url
    }
   
  }
`);
