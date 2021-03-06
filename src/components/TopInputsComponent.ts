import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { IGenre } from '../types/IGenre';

@Component({
  name: "side-menu"
})
export default class TopInputsComponent extends Vue {
  get genresList(): IGenre[] {
    return this.$store.state.genres;
  };
  get innerGenreId(): number | null {
    return this.$store.state.genreId;
  }
  set innerGenreId(value: number | null) {
    this.$store.commit('setGenreId', value);
  }

  async created(): Promise<void> {
    await this.load();
  }

  async load(): Promise<void> {
    if (this.genresList.length === 0 || !this.innerGenreId) {
      await this.$store.dispatch('fetchGenreList');
    }
  }
}