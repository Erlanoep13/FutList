import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Racha } from './Racha';

@Entity('racha_nomes')
export class RachaNome {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  tipo_entrada!: string; // 'whatsapp' ou 'extra'

  @Column({ type: 'integer', nullable: true })
  time_sorteado!: number; // 1, 2, 3...

  @Column()
  racha_id!: number;

  // Relacionamento: Muitos nomes pertencem a um racha
  @ManyToOne(() => Racha, (racha) => racha.nomes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'racha_id' })
  racha!: Racha;
}