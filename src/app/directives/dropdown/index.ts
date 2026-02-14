import { DataTypes } from 'sequelize';
import { GSC_ANALYTICS_STATUS, GSC_DEVICE } from '../../../constants';
import { sequelize } from '../../../loaders/postgres';

const schema = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\d{4}-\d{2}-\d{2}$/, // "YYYY-MM-DD"
    },
  },
  blogId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'blog_id',
  },
  pageUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'page_url',
  },
  slug: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  keyword: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  device: {
    type: DataTypes.ENUM(...GSC_DEVICE),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(3),
    allowNull: false,
    validate: {
      is: /^[a-z]{3}$/,
    },
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  impressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  ctr: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  position: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  organisationId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'organisation_id',
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'product_id',
  },
  status: {
    type: DataTypes.ENUM(...GSC_ANALYTICS_STATUS),
    defaultValue: 'NOT_RESEARCHED',
  }
};

const schemaV2 = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  a: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}

const GSC_SEARCH_ANALYTICS = sequelize.define(
  'gsc_mixpanel_data',
  schemaV2,
  {
    tableName: 'gsc_search_metrics',
    schema: 'gsc_mixpanel_data',
    timestamps: true,
    hooks: {
      beforeValidate: (instance: any) => {
        if (instance.keyword) instance.keyword = instance.keyword.toLowerCase().trim();
        if (instance.device) instance.device = instance.device.toLowerCase().trim();
        if (instance.country) instance.country = instance.country.toLowerCase().trim();
        if (instance.slug) instance.slug = instance.slug.toLowerCase().trim();
      },
    }
  }
);

async function init() {
  await sequelize.query(`CREATE SCHEMA IF NOT EXISTS gsc_mixpanel_data;`);

  await GSC_SEARCH_ANALYTICS.sync({ alter: true }); // alter:true updates table if schema changes
  console.log('Table synced!');
}

init()

export { GSC_SEARCH_ANALYTICS };