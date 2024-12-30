import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity()
  export class EmailTemplates {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    html: string;
  
    @Column({ nullable: false })
    preview: string;
  
    // fixed Columns
    @Column({ default: true, nullable: false })
    isActive: boolean;
  
    @Column({ nullable: true })
    createdBy: number;
  
    @Column({ nullable: true })
    updatedBy: number;
  
    @Column({ nullable: true })
    deletedBy: number;
  
    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', nullable: false })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamptz', nullable: true, select: false })
    deletedAt: Date;
  }
  