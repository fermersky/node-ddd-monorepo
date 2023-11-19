/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.raw(`
    CREATE TABLE work_shifts (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      "start" timestamptz NULL,
      "end" timestamptz NULL,
      resource_id uuid NULL,
      driver_id uuid NULL,
      CONSTRAINT pk_work_shifts PRIMARY KEY (id),
      CONSTRAINT uq_work_shifts_id UNIQUE (id)
    );

    CREATE TABLE drivers (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      "password" varchar NULL,
      email varchar NULL,
      phone varchar NULL,
      first_name varchar NULL,
      last_name varchar NULL,
      device_id varchar NULL,
      CONSTRAINT pk_drivers PRIMARY KEY (id),
      CONSTRAINT uq_drivers_email UNIQUE (email),
      CONSTRAINT uq_drivers_id UNIQUE (id)
    );
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.raw('DROP TABLE IF EXISTS drivers CASCADE; DROP TABLE IF EXISTS work_shifts CASCADE;');
};
