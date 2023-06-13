import nx from '@jswork/next';
import EventMitt from '@jswork/event-mitt';
import ViteEnvs from '@jswork/vite-envs';

// classes
import '@jswork/next-weapp-storage';
import '@jswork/next-date';

// packages
import '@jswork/next-capitalize';
import '@jswork/next-classify';
import '@jswork/next-compact-object';
import '@jswork/next-deep-assign';
import '@jswork/next-deep-clone';
import '@jswork/next-deep-each';
import '@jswork/next-deep-equal';
import '@jswork/next-empty';
import '@jswork/next-get2get';
import '@jswork/next-is-empty-object';
import '@jswork/next-is-plain-object';
import '@jswork/next-kebab-case';
import '@jswork/next-key-map';
import '@jswork/next-param';
import '@jswork/next-qs';
import '@jswork/next-sets';
import '@jswork/next-json';
import '@jswork/next-global';

const defaults = { prefix: 'nuk', initialData: null };

const NxUniappKits = nx.declare('nx.UniappKits', {
  statics: {
    init: function () {
      nx.sets({ $env: ViteEnvs.get });
      nx.sets({ $event: nx.mix(null, EventMitt) });
      nx.sets({
        $options: function (inKey) {
          const res = wx.getEnterOptionsSync();
          return inKey ? nx.get(res, inKey) : res;
        }
      });
    },
    create: function (inOptions) {
      return new this(inOptions);
    }
  },
  methods: {
    init: function (inOptions) {
      this.options = nx.mix(null, defaults, inOptions);
      this.initLocal();
      this.initGlobal();
    },
    initLocal: function () {
      const { prefix } = this.options;
      nx.sets({ $local: new nx.WeappStorage(prefix) });
    },
    initGlobal: function () {
      const { initialData } = this.options;
      nx.sets({ $global: nx.global(initialData) });
    }
  }
});

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = NxUniappKits;
}

export default NxUniappKits;
