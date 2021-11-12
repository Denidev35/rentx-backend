import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connetcion = await createConnection('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connetcion.query(
    `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxxxx')
    `,
  );

  await connetcion.close;
}

create().then(() => console.log('User admin created'));
