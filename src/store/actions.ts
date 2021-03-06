import configApp from '../config/configApp';

const myInit: RequestInit = {
  method: 'GET',
  mode: 'cors',
}

export const actions = {
  async fetchConfiguration(context: any): Promise<void> {
    try {
      const listUrl = new URL(
        `https://api.themoviedb.org/3/configuration?api_key=${configApp.apiKey3}`
      );
      const response = await fetch(
        listUrl.toString(), myInit
      );
      const data = await response.json();
      context.commit('setConfiguration', data);
    } catch (e) {
      console.error('Error on fetch config, ', e);
    }
  },

  async fetchGenreList(context: any): Promise<void> {
    try {
      const listUrl = new URL(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${configApp.apiKey3}&language=${configApp.language}`
      );
      const response = await fetch(
        listUrl.toString(), myInit
      );
      const data = await response.json();
      context.commit('setGenreList', data.genres);
      context.commit('setGenreId', data.genres[0].id);
    } catch (e) {
      console.error('Error on fetch genres, ', e);
    }

  },

  async fetchFilmList(
    context: any,
    payload: string = context.state.genreId): Promise<void> {
    try {
      context.commit('setIsFilmListLoading', true);
      const listUrl = new URL(
        `https://api.themoviedb.org/3/discover/movie?api_key=${configApp.apiKey3}&language=${configApp.language}&page=${context.state.filmListPage}&with_genres=${payload}`
      );
      const response = await fetch(
        listUrl.toString(), myInit
      );
      const data = await response.json();
      context.commit('setFilmList', data.results);
      context.commit('setFilmListPage', data.page);
      context.commit('setTotalFilmListResult', data.total_results);
      context.commit('setTotalFilmListPages', data.total_pages);
      context.commit('setIsFilmListLoading', false);
    }
    catch (e) {
      console.error("Error on getting film list, ", e);
    }
  },

  async fetchMovieDetails(
    context: any,
    payload: { id: number | null, append: string[] } = { id: null, append: [] }
  ): Promise<void> {
    if (payload.id) {
      try {
        let append = '';
        if (payload.append.length > 0) {
          append = '&append_to_response=' + payload.append.join(',');
        }
        const listUrl = new URL(
          `https://api.themoviedb.org/3/movie/${payload.id}?api_key=${configApp.apiKey3}&language=${configApp.language}${append}`
        );
        const response = await fetch(
          listUrl.toString(), myInit
        );
        const data = await response.json();
        context.commit('setMovieDetails', data)
      }
      catch (e) {
        console.error("Error on getting film details, ", e);
      }
    }
  }
}