'use babel';

import Slot2022View from './slot-2022-view';
import { CompositeDisposable } from 'atom';

export default {

  slot2022View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slot2022View = new Slot2022View(state.slot2022ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slot2022View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-2022:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slot2022View.destroy();
  },

  serialize() {
    return {
      slot2022ViewState: this.slot2022View.serialize()
    };
  },

  toggle() {
    console.log('Slot2022 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
