export default {
    globalFilter<T>(data: T[], text: string) {
      const words = text.split(" ").map(x => x.toUpperCase()).filter(x => x.length > 0);

      if (words.length <= 0) return data
      
      return data.filter((row) => {
        const stringfied = JSON.stringify(row).toUpperCase();
        for (let word of words) {
          if (!stringfied.includes(word)) return false;
          else return true;
        }
      });
    }
}
